# dreemhack

Dreemhack is a proof of concept monitoring platform for orchestrating network and domain reconnaissance. The goal is to launch Nmap and subdomain scans through distributed workers and aggregate the results in a single interface for monitoring and analysis.

## Stack

- Nuxt.js + Vue.js for the frontend (subject to change after the rework)
- NestJS for the backend and orchestration layer (subject to change after the rework)
- PostgreSQL + Prisma for persistence
- Socket.IO for frontend real-time communication only
- Nmap and subdomain reconnaissance tooling for scanning jobs
- TypeScript across the project