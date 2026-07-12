# Planning Optimization Example

This example demonstrates how TokenGuardian optimizes architectural plans, task breakdowns, or roadmap steps.

---

## 🙋 User Prompt
> Create a plan to deploy a Node.js API to AWS ECS.

---

## ❌ Normal Response
> Deploying a Node.js application to AWS ECS (Elastic Container Service) involves several sequential steps. Here is a step-by-step plan you can follow to complete the deployment successfully.
> 
> ### Step 1: Dockerize the Application
> First, you need to create a `Dockerfile` at the root of your Node.js project. This file will define how your container image is built, including copying the package files, running npm install, and exposing the app port. Once built, you'll login to AWS ECR (Elastic Container Registry) and push your image there so ECS can access it.
> 
> ### Step 2: Set up AWS Infrastructure
> Next, you need to set up your networking infrastructure. Create a VPC with public and private subnets across two availability zones, and set up an Internet Gateway. Then, create an ECS Cluster. You'll also need to define an IAM Execution Role that allows ECS to pull images from ECR and write logs to CloudWatch.
> 
> ### Step 3: Define Task and Service
> Create an ECS Task Definition specifying the container image URL from ECR, port mappings (typically port 3000), CPU and memory allocations, and environment variables. After the task is defined, create an ECS Service. Set the launch type to Fargate for serverless operations.
> 
> ### Step 4: Configure Load Balancer
> Create an Application Load Balancer (ALB) to distribute traffic to your containers. Set up a target group that routes HTTP traffic on port 80 to the containers on port 3000.
> 
> ### Step 5: Verify Deployment
> Once the service runs tasks successfully, test the load balancer's DNS endpoint to verify the Node.js API is reachable and responding.
> 
> I hope this deployment plan helps! Let me know if you want the Terraform configurations for these resources.

* **Tokens used**: ~332 tokens.

---

##  Optimized TokenGuardian Response
> 1. **Dockerization**
>    - Create `Dockerfile` (multi-stage, Node Alpine base).
>    - Create AWS ECR repository; build, tag, and push image.
> 2. **IAM & Network Setup**
>    - Deploy VPC (2 Public / 2 Private Subnets, IGW, NAT Gateway).
>    - Create ECS Task Execution Role (ECR pull, CloudWatch logs permissions).
> 3. **ECS Configuration**
>    - Create ECS Fargate Cluster.
>    - Define Task Definition (ECR Image URI, Port 3000 mapping, CPU/Memory limits).
> 4. **Traffic Routing**
>    - Deploy ALB (Listener Port 80, Target Group routing to Port 3000).
>    - Create ECS Service (Launch Type: FARGATE, replica count: 2, attach to ALB Target Group).
> 5. **Verification**
>    - Verify task health status in ECS console; test ALB DNS endpoint.

* **Tokens used**: ~158 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 332
* **TokenGuardian Response Tokens**: 158
* **Total Tokens Saved**: 174 tokens
* **Output Token Reduction**: **52.4%**
* **Why it saved tokens**: Rewrote paragraph descriptions into bullet-list actions, removed transition paragraphs and explanation of *why* steps occur (e.g. explaining what a Dockerfile is), and omitted polite framing.
