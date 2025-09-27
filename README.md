# Cosmic Connections 🌟

A modern dating platform that combines astrology with meaningful relationships. Built with Next.js, TypeScript, and Tailwind CSS.

## Features ✨

- **Astrological Matching**: Find your cosmic soulmate through advanced astrological compatibility
- **Horoscope Integration**: Daily personalized horoscopes and cosmic insights
- **Modern UI**: Beautiful, responsive design inspired by Bumble
- **Real-time Chat**: Connect with your matches instantly
- **Profile Verification**: Secure and verified user profiles
- **Event System**: Join cosmic IRL events and meetups
- **Mobile Responsive**: Optimized for all devices

## Tech Stack 🚀

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (configurable)
- **Authentication**: JWT-based auth
- **Icons**: Lucide React

## Getting Started 🏃‍♂️

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional for development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cosmic-connections
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your configuration

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
cosmic-connections/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── compatibility/ # Astrological compatibility
│   │   └── horoscope/     # Horoscope data
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   ├── Testimonials.tsx   # User testimonials
│   ├── Newsletter.tsx     # Newsletter signup
│   ├── Footer.tsx         # Footer
│   ├── ZodiacCompatibility.tsx # Compatibility widget
│   └── HoroscopeCard.tsx  # Horoscope display
├── types/                 # TypeScript type definitions
│   └── index.ts           # Main type definitions
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Astrology
- `POST /api/compatibility` - Calculate compatibility between two zodiac signs
- `GET /api/horoscope?sign=Aries&date=2024-01-01` - Get daily horoscope

## Features in Detail 🌟

### Astrological Compatibility
- Sun sign compatibility
- Moon sign analysis
- Rising sign matching
- Venus and Mars compatibility
- Detailed compatibility scores
- Personalized advice and insights

### Horoscope System
- Daily personalized horoscopes
- Love, career, health, and luck scores
- Lucky colors and numbers
- Best matches for the day
- Mood indicators

### Modern UI/UX
- Responsive design for all devices
- Smooth animations with Framer Motion
- Beautiful gradient designs
- Intuitive navigation
- Accessibility features

## Deployment 🚀

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables 🔧

Create a `.env.local` file with the following variables:

```env
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://username:password@localhost:5432/cosmic_connections
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at support@cosmicconnections.com

## Acknowledgments 🙏

- Inspired by Bumble's beautiful design
- Built with modern web technologies
- Powered by cosmic energy ✨

---

Made with ❤️ and cosmic energy by the Cosmic Connections team
