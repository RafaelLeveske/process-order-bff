# 🚀 process-order-bff

> A lightweight BFF (Backend-for-Frontend) built with Serverless Framework and TypeScript. It exposes an HTTP endpoint via API Gateway that sends messages to an AWS SQS queue for service order processing.

## 📚 Overview

This project implements a serverless API using **TypeScript** and the **Serverless Framework** to receive service order data from frontend clients or other systems and push it into an **AWS SQS queue**.

It acts as a communication layer between the frontend and the queue, ensuring asynchronous and decoupled processing of service orders.

---

## ⚙️ Architecture

```
[Client / Frontend]
        │
     HTTP API
        │
[API Gateway + Lambda (BFF)]
        │
     [AWS SQS Queue]
        │
[Consumer Service: order indexer]
```

- **API Gateway**: Exposes an HTTP POST endpoint to accept order data
- **Lambda (BFF)**: Handles requests and sends them to the SQS queue
- **SQS**: Buffers messages for asynchronous consumption
- **Consumer (another service)**: Processes and indexes the received orders

---

## 🧑‍💻 Tech Stack

- **TypeScript**
- **Serverless Framework**
- **AWS Lambda**
- **AWS API Gateway**
- **AWS SQS**

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) configured with credentials

---

### 1. Install dependencies

```bash
npm install
```

---

### 2. Deploy to AWS

```bash
npx serverless deploy
```

After deployment, you will receive a URL like:

```
https://<your-api-id>.execute-api.<region>.amazonaws.com/dev/orders
```

---

### 3. Sending a Test Request

Use `curl` or Postman to send a request:

```bash
curl -X POST https://<your-api-id>.execute-api.<region>.amazonaws.com/process-order \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "123",
    "description": "Test order from BFF"
  }'
```

This will publish the order data to the configured SQS queue.

---

## 📁 Project Structure

```bash
process-order-bff/
├── README.md               # Project documentation and usage guide
├── api.ts                 # Entry point for the Serverless handler (mapped in serverless.yml)
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Lock file for deterministic installs
├── serverless.yml          # Serverless Framework configuration (functions, resources, permissions)
├── tsconfig.json           # TypeScript compiler configuration
├── tsconfig.paths.json     # Custom path aliases used in the project
├── src/
│   ├── modules/            # Domain-specific logic (e.g., order handling)
│   └── shared/             # Reusable utilities, services, or configuration
```

---

## 🤝 Contributing

1. Fork this repository  
2. Create a new branch: `git checkout -b my-feature`  
3. Commit your changes: `git commit -m 'feat: my feature'`  
4. Push your branch: `git push origin my-feature`  
5. Open a Pull Request

---

## 💡 Future Improvements

- Add input validation and schema enforcement  
- Add authentication layer (e.g., Cognito, JWT)  
- Improve error handling and monitoring (e.g., with CloudWatch)  
- Configure retry policies and DLQ for SQS failures

---

## 🧑‍🏫 Author

Developed by **Rafael Vieira**  
[LinkedIn](https://www.linkedin.com/in/rafael-eraldo-vieira/)  
[GitHub](https://github.com/RafaelLeveske)
