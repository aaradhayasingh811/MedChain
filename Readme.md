# MedChain: Blockchain-Based Healthcare Data Management

MedChain is a full-stack platform for secure, privacy-preserving healthcare data management using blockchain, zero-knowledge proofs, and FHIR standards. It empowers patients, providers, emergency responders, and researchers to manage, access, and share medical records with transparency and control.

---

## Features

- **Patient Portal:** Upload, encrypt, and control access to your medical records.
- **Provider Access:** Doctors can request and view patient records with patient consent.
- **Emergency Access:** Multi-signature "break-glass" access for emergency responders.
- **Research Portal:** Researchers can request anonymized datasets for studies.
- **Blockchain Security:** All access and consent actions are logged immutably.
- **Zero-Knowledge Proofs:** Privacy-preserving access and consent mechanisms.
- **FHIR Compliance:** Interoperable data format for healthcare integration.
- **IPFS Storage:** Decentralized, encrypted storage of medical records.

---

## Project Structure

```
backend/
  index.js
  package.json
  config/
    db.js
  controllers/
    authController.js
    uploadController.js
  middlewares/
  models/
    User.js
  routes/
    authRoutes.js
    uploadRoute.js
  uploads/
  utils/
    encrypt.js
    fhir.js
    ipfs.js
client/
  index.html
  package.json
  src/
    App.jsx
    main.jsx
    components/
      HeroPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      Dashboard.jsx
      Navbar.jsx
      UploadData.jsx
      AccessRequest.jsx
      GrantConsent.jsx
      EmergencyAccess.jsx
      ResearchPortal.jsx
contracts/
  AccessControl.sol
  HealthRecord.sol
  ResearchToken.sol
fhir-server/
test/
zk/
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- [Pinata](https://pinata.cloud/) account for IPFS (or configure your own IPFS node)
- MetaMask or compatible Ethereum wallet (for smart contract interaction)

### 1. Clone the Repository

```sh
git clone https://github.com/your-org/medchain.git
cd medchain
```

### 2. Backend Setup

```sh
cd backend
cp .env.example .env   # Fill in MongoDB URI, Pinata keys, email credentials, etc.
npm install
npm run dev            # or: node index.js
```

#### Backend Environment Variables (`backend/.env`)

```
MONGO_URI=your_mongodb_uri
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
PORT=5000
```

### 3. Smart Contracts

- Compile and deploy contracts in `contracts/` using [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/).
- Update contract addresses in the frontend as needed.

### 4. Frontend Setup

```sh
cd ../client
cp .env.example .env   # Set VITE_API_BASE_URL, etc.
npm install
npm run dev
```

#### Frontend Environment Variables (`client/.env`)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Access the App

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

- **Register** as a patient, doctor, researcher, or emergency responder.
- **Patients:** Upload PDFs, manage access, and grant/deny requests.
- **Doctors:** Request access to patient records.
- **Emergency Responders:** Request emergency access (multi-sig approval).
- **Researchers:** Request anonymized datasets for research.

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Heroicons
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Blockchain:** Solidity, Hardhat/Truffle, ethers.js
- **Storage:** IPFS (via Pinata)
- **Interoperability:** FHIR (Fast Healthcare Interoperability Resources)
- **Security:** JWT, bcrypt, nodemailer, zero-knowledge proofs (zk)

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [FHIR](https://www.hl7.org/fhir/)
- [IPFS](https://ipfs.io/)
- [Pinata](https://pinata.cloud/)
- [Hardhat](https://hardhat.org/)
- [Vite](https://vitejs.dev/)
