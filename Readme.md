
# 🏥 MedChain: A Decentralized Health Data Management Platform

**Secure, patient-centric healthcare records powered by Blockchain, IPFS, and Zero-Knowledge Proofs.**


MedChain is a full-stack platform designed to revolutionize healthcare data management. By leveraging blockchain for transparency, IPFS for decentralized storage, and FHIR standards for interoperability, MedChain puts patients back in control of their medical records. It provides a secure and auditable environment for patients, providers, emergency responders, and researchers to interact with sensitive health data.

-----

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
|  **Patient-Centric Control** | Patients can upload, manage, and grant granular, time-bound access to their records. |
|  **Provider & Emergency Access** | Doctors request access with patient consent. A multi-sig "break-glass" feature allows emergency access. |
|  **Privacy-Preserving Research** | Researchers can request and receive anonymized datasets, incentivized by a research token. |
|  **Verifiable Security** | All consent and access events are immutably logged on the blockchain, ensuring a transparent audit trail. |
|  **Interoperability** | Built on the **FHIR** standard to ensure seamless integration with existing healthcare systems. |
|  decentralized **Decentralized Storage** | Medical records are encrypted and stored on **IPFS**, preventing single points of failure. |

-----

## ⚙️ 0. System Setup

### Prerequisites

  - **Node.js** (v16+ recommended)
  - **npm** or **yarn**
  - **MongoDB** instance (local or cloud)
  - [**Pinata**](https://pinata.cloud/) account for IPFS
  - **MetaMask** or a compatible Ethereum wallet

### Installation Steps

#### 1\. Clone the Repository

```sh
git clone https://github.com/aaradhayasingh811/medchain.git
cd medchain
```

#### 2\. Backend Configuration

```sh
cd backend
cp .env.example .env
npm install
npm run dev
```

> **Note:** Open `backend/.env` and fill in your **MongoDB URI**, **Pinata API keys**, and **email credentials**.

#### 3\. Frontend Configuration

```sh
cd ../client
cp .env.example .env
npm install
npm run dev
```

> **Note:** The `client/.env` file should point `VITE_API_BASE_URL` to your backend server (e.g., `http://localhost:5000/api`).

#### 4\. Smart Contract Deployment

  - Navigate to the `contracts/` directory.
  - Use a framework like **Hardhat** or **Truffle** to compile and deploy the `.sol` files.
  - Update the deployed contract addresses in the frontend configuration to enable interaction.

#### 5\. Access the Application

  - Open **`http://localhost:5173`** in your browser to start using MedChain.

-----

## 📖 1. Introduction

Traditional Electronic Health Record (EHR) systems are centralized, siloed, and prone to data breaches. Patients lack true ownership and control over their own medical history, leading to inefficiencies, privacy risks, and barriers to research. MedChain addresses these critical issues by creating a decentralized ecosystem where data integrity, patient consent, and security are paramount. Our vision is to empower patients, streamline clinical workflows, and accelerate medical innovation through trust and transparency.

-----

## 🛠️ 2. Methodology

The MedChain platform is built on a hybrid architecture that combines the strengths of decentralized and traditional technologies to ensure security, privacy, and performance.

1.  **Identity & Authentication**: Users register with roles (Patient, Doctor, etc.) managed by a secure Node.js backend using JWT for session management.
2.  **Data Encryption & Storage**: When a patient uploads a record, the file is first **encrypted** on the client-side. The encrypted file is then uploaded to **IPFS**, which returns a unique content identifier (CID).
3.  **On-Chain Logging**: The IPFS CID, along with a metadata hash, is stored in the **`HealthRecord.sol`** smart contract on the blockchain. This links the patient's identity to their data's location without exposing the data itself.
4.  **Consent Management**: All access requests and grants are executed as transactions via the **`AccessControl.sol`** smart contract. This creates an immutable, timestamped log of every consent-related action, which is verifiable by all parties.
5.  **Zero-Knowledge Proofs (ZKP)**: For advanced privacy, ZKPs can be used to verify a patient's claim (e.g., "I am over 18" or "I have been diagnosed with Type 2 Diabetes") without revealing the underlying data, enabling truly anonymized data aggregation for research.

-----

## 🏛️ 3. System Design

The platform consists of several core components working in synergy:

  - **Frontend Client**: A responsive React application (built with Vite) that provides the user interface for all roles. It handles data encryption, wallet interactions (via ethers.js), and communication with the backend.
  - **Backend Server**: A Node.js/Express server that manages user authentication, role-based access, and orchestrates interactions with Pinata (for IPFS) and the FHIR server. It serves as a bridge for off-chain operations.
  - **Smart Contracts (Solidity)**:
      - `HealthRecord.sol`: Manages the registry of medical record CIDs.
      - `AccessControl.sol`: Governs the logic for requesting, granting, and revoking access.
      - `ResearchToken.sol`: An ERC721 token to incentivize researchers and institutions.
  - **Decentralized Storage (IPFS)**: Stores encrypted medical files, ensuring data availability and censorship resistance.
  - **FHIR Server**: An optional but recommended component to ensure data is structured in a globally recognized, interoperable format.

-----

## 💻 4. Implementation

### Tech Stack

  - **Frontend**: React, Vite, Tailwind CSS, ethers.js
  - **Backend**: Node.js, Express, MongoDB
  - **Blockchain**: Solidity, Hardhat
  - **Storage**: IPFS (via Pinata)
  - **Security**: JWT, bcrypt, Zero-Knowledge Proofs

### Project Structure

```
medchain/
├── backend/        # Node.js server for user management & off-chain logic
├── client/         # React frontend for user interaction
├── contracts/      # Solidity smart contracts
├── fhir-server/    # FHIR-compliant data server
├── test/           # Test suites for contracts and backend
└── zk/             # Circuits for Zero-Knowledge Proofs
```

-----

## 💬 5. Discussion

### 5.1 Limitations

  - **Scalability & Gas Costs**: High transaction volume on the Ethereum mainnet can be expensive. Layer-2 solutions or alternative blockchains could mitigate this.
  - **User Experience (UX)**: Interacting with blockchain (e.g., managing private keys, signing transactions) presents a steep learning curve for non-technical users.
  - **Data Immutability**: While a feature, the inability to erase data from the blockchain can conflict with "right to be forgotten" regulations like GDPR. Our design mitigates this by only storing pointers (CIDs) on-chain, not the data itself.

### 5.2 Future Development

  - **Mobile Application**: Develop native iOS and Android apps for on-the-go access.
  - **Advanced ZKP Integration**: Implement more complex zero-knowledge circuits for sophisticated, privacy-preserving queries.
  - **DAO for Governance**: Establish a Decentralized Autonomous Organization (DAO) to govern the research portal and manage the `ResearchToken` ecosystem.
  - **On-Chain Data Analytics**: Explore tools to enable privacy-preserving analysis of on-chain data for public health insights.

-----

##  6. Conclusion

MedChain presents a robust and scalable model for a patient-centric healthcare data management system. By integrating blockchain technology with established standards like FHIR, it provides a secure, transparent, and interoperable solution that addresses the fundamental flaws of existing EHR systems. It empowers patients with true data ownership, fosters trust between stakeholders, and paves the way for a more efficient and equitable healthcare future.