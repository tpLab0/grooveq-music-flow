
# GrooveQ - Collaborative Music Streaming Platform

GrooveQ is a collaborative music platform that allows users to create and share playlists, vote on songs, and enjoy music together in real-time.

![GrooveQ Screenshot](https://via.placeholder.com/800x400?text=GrooveQ+Screenshot)

## Features

- **Collaborative playlists**: Create music queues that everyone can contribute to
- **Voting system**: Vote songs up or down to influence the playback order
- **YouTube integration**: Add songs directly from YouTube
- **Real-time updates**: See changes to playlists and votes instantly
- **User accounts**: Register, login, and manage your playlists
- **Mobile responsive**: Enjoy the experience on any device

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Real-time**: Socket.io
- **State Management**: React Context, TanStack Query
- **Deployment**: Docker

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Docker (optional, for containerized setup)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/grooveq.git
cd grooveq
```

2. **Setup environment**

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Create a `.env` file from `.env.example`
- Install dependencies
- Generate Prisma client
- Create and apply database migrations
- Prepare the application for development

3. **Start the development server**

```bash
npm run dev
```

4. **Access the application**

Open your browser and navigate to `http://localhost:5173`

### Docker Setup

For a containerized setup:

```bash
# Start the Docker containers
chmod +x docker-dev.sh
./docker-dev.sh
```

Access the application at `http://localhost:8080`

## Database Schema

GrooveQ uses PostgreSQL with the following models:

- **Users**: Authentication and user profile information
- **Playlists**: Music collections created by users
- **Songs**: Music tracks added to playlists from YouTube
- **Votes**: User votes on songs that affect queue order

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- YouTube Data API
- All contributors and users of the platform
