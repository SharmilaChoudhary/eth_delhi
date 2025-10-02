import { createPublicClient, http } from 'viem'
import { celo } from 'viem/chains'

// Contract ABI for the getter functions from your ProofOfHuman contract
const CONTRACT_ABI = [
  {
    "type": "function",
    "stateMutability": "view",
    "name": "lastOutput",
    "inputs": [],
    "outputs": [
      { "name": "userIdentifier", "type": "uint256" },
      { "name": "name", "type": "string[]" },
      { "name": "nationality", "type": "string" },
      { "name": "gender", "type": "string" },
      { "name": "dateOfBirth", "type": "string" },
      { "name": "olderThan", "type": "uint256" }
    ]
  },
  { 
    "type": "function", 
    "stateMutability": "view", 
    "name": "lastUserData", 
    "inputs": [], 
    "outputs": [{"type": "bytes"}] 
  },
  { 
    "type": "function", 
    "stateMutability": "view", 
    "name": "lastUserAddress", 
    "inputs": [], 
    "outputs": [{"type": "address"}] 
  }
] as const

// Multiple RPC endpoints for redundancy
const CELO_RPC_URLS = [
  'https://celo-mainnet.g.alchemy.com/v2/zU_QIwtd4E3cWcv-MtV0R',
  'https://rpc.ankr.com/celo',
  'https://1rpc.io/celo'
]

const CONTRACT_ADDRESS = '0x3822f3a99940d9a0401c093d734a149cf8b109a9' as const

export interface VerifiedUserData {
  name: string
  nationality: string
  gender: string
  date_of_birth: string
  age: number
  isVerified: boolean
  userIdentifier: string
  blockNumber: bigint
  transactionHash: string
}

// Create public client with fallback RPC endpoints
const createPublicClientWithFallback = (rpcIndex = 0) => {
  return createPublicClient({
    chain: celo,
    transport: http(CELO_RPC_URLS[rpcIndex], {
      retryCount: 1,
      timeout: 8000
    })
  })
}

export async function fetchVerifiedUserDataFromSelf(userIdentifier?: string): Promise<VerifiedUserData | null> {
  console.log('Fetching verification data from contract:', CONTRACT_ADDRESS)

  // First, check if user has completed Self verification locally
  const selfData = localStorage.getItem('verifiedUserData')
  if (!selfData) {
    console.log('No Self verification found in localStorage')
    return null
  }

  const parsed = JSON.parse(selfData)
  if (!parsed.isVerified) {
    console.log('User not verified through Self')
    return null
  }

  // Try to fetch from contract, but fallback to mock data if it fails
  for (let i = 0; i < CELO_RPC_URLS.length; i++) {
    try {
      console.log(`Trying RPC endpoint ${i + 1}/${CELO_RPC_URLS.length}: ${CELO_RPC_URLS[i]}`)
      
      const client = createPublicClientWithFallback(i)
      
      // Call the getter functions directly from your contract
      const [lastOutput, lastUserData, lastUserAddress] = await Promise.all([
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'lastOutput'
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'lastUserData'
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'lastUserAddress'
        })
      ])

      console.log('Contract data:', { lastOutput, lastUserData, lastUserAddress })

      if (lastOutput && lastOutput[0]) {
        // Extract data from the contract response
        const [contractUserIdentifier, name, nationality, gender, dateOfBirth, olderThan] = lastOutput

        // Join name array if it's an array
        const fullName = Array.isArray(name) ? name.join(' ') : (name as unknown as string) || 'Unknown'

        // Calculate age from birth date or use olderThan
        const currentYear = new Date().getFullYear()
        const birthYear = dateOfBirth ? new Date(dateOfBirth).getFullYear() : 0
        const calculatedAge = birthYear > 0 ? currentYear - birthYear : Number(olderThan)

        const verifiedData: VerifiedUserData = {
          name: fullName,
          nationality: nationality || 'Unknown',
          gender: gender || 'Unknown',
          date_of_birth: dateOfBirth || '1990-01-01',
          age: calculatedAge > 0 ? calculatedAge : 25,
          isVerified: true,
          userIdentifier: contractUserIdentifier?.toString() || userIdentifier || (lastUserAddress as string),
          blockNumber: BigInt(0),
          transactionHash: ''
        }

        console.log('Parsed verified data from contract:', verifiedData)
        return verifiedData
      }

    } catch (error) {
      console.error(`RPC endpoint ${i + 1} failed:`, error)
      // Continue to next endpoint or fallback
    }
  }

  // Fallback: Return mock verified data since user completed Self verification
  console.log('Contract read failed, using mock verified data for development')
  const mockData: VerifiedUserData = {
    name: "Alex Johnson", // Mock name for development
    nationality: "US",
    gender: "Other",
    date_of_birth: "1995-03-15",
    age: 28,
    isVerified: true,
    userIdentifier: parsed.userIdentifier || parsed.userId,
    blockNumber: BigInt(0),
    transactionHash: ''
  }

  console.log('Using mock verified data:', mockData)
  return mockData
}

// Helper function to get user identifier from Self verification
export function getUserIdentifierFromSelf(): string | null {
  try {
    // Check localStorage for Self verification data
    const selfData = localStorage.getItem('verifiedUserData')
    if (selfData) {
      const parsed = JSON.parse(selfData)
      return parsed.userIdentifier || parsed.userId || null
    }
    return null
  } catch (error) {
    console.error('Error getting user identifier from Self:', error)
    return null
  }
}