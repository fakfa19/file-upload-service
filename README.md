# File Upload Service with Email Notification

This microservice allows you to upload files and receive email notifications upon successful upload.


## Features

- File upload request
- Stor the file uploaded
- Send email notification


## Considerations:

**Security (ความปลอดภัย):**

- มีการตรวจสอบขนาดของไฟล์
- มีการตรวจสอบชนิดของไฟล์ที่ได้รับ
- มีการยืนยันตัวตน (authentication) ด้วยบัญชีผู้ใช้งานและรหัสผ่าน ซึ่งช่วยในการป้องกันการส่งอีเมล์โดยไม่ได้รับอนุญาต (unauthorized email sending) โดยบัญชีผู้ใช้งานจะต้องมีสิทธิ์ในการส่งอีเมล์จาก SMTP server


**Scalability (ความสามารถในการขยายขนาด):**

- มีโครงสร้างที่เหมาะสมสำหรับการขยายขนาด เนื่องจากมีการใช้ Express.js ซึ่งเป็นเฟรมเวิร์กที่มีประสิทธิภาพสูงในการจัดการการเรียก API และมีความยืดหยุ่นในการตั้งค่าการขยายขนาด เช่นการใช้ load balancing หรือการทำคลัสเตอร์
- การใช้ multer สามารถทำงานร่วมกับบริการจัดเก็บไฟล์แบบแยกส่วนได้ เช่น Amazon S3 หรือ Google Cloud Storage เพื่อเพิ่มประสิทธิภาพในการจัดการฐานข้อมูล


**Testability (ความสามารถในการทดสอบ):**

- โค้ดสามารถทดสอบได้โดย (unit testing) และ (integration testing) เพื่อตรวจสอบความถูกต้องของการทำงานของแต่ละส่วน
- สามารถทดสอบการอัปโหลดไฟล์ได้โดยการส่งคำขอ HTTP ผ่านเครื่องมือทดสอบ API เพื่อตรวจสอบว่าไฟล์ถูกบันทึกและอัปโหลดได้ถูกต้องหรือไม่


**API Standard (RESTful):**

- **Endpoint:** กำหนด endpoint (`/upload`)
- **Method:** ใช้ HTTP methods `POST`
- **Request Body:** ควรอยู่ในรูปแบบ `multipart/form-data` ซึ่งมีข้อมูลไฟล์
- **Response:**
  - return status `201` Created — เมื่ออัปโหลดสำเร็จ
  - return status `400` Bad Request — สำหรับข้อผิดพลาดในการ validation
  - return status `500` Internal Server Error — สำหรับปัญหาที่ไม่คาดคิด


## Project Setup:
```bash
# Create a new project directory:
mkdir file-upload-service && cd file-upload-service

# Initialize npm:
npm init -y

# Install required packages:
npm install express multer nodemailer mime-types dotenv
```

## Environment Variables:
1. Create a .env file (not version controlled) to store sensitive information:
```bash
PORT=3000 # Change to your desired port

# SMTP
SMTP_HOST="smtp.ethereal.email"
SMTP_PORT=587

# Ethereal test account
EMAIL_FROM="your_email@example.com"
EMAIL_PASSWORD=""

EMAIL_TO="recipient_email@example.com"

# 'txt', 'pdf', 'heic', 'heif', 'jpeg', 'jpg', 'gif', 'png', 'tiff'
ACCEPT_FILE_TYPES="text/plain,application/pdf,image/heic,image/heif,image/jpeg,image/gif,image/png,image/tiff"
# จำกัดขนาดไฟล์เป็น 10MB
ACCEPT_FILE_SIZE=10000000
```


2 .Use dotenv to load environment variables:

```JavaScript
require('dotenv').config();
```

## Before usage:
1. Navigate to the project directory:
```bash
cd file-upload-service
```
2. Install dependencies:
```bash
npm install
```
3. Configure SMTP settings:
    - Open the `.env` file.
    - Replace following variables:
      - `SMTP_HOST`
      - `SMTP_PORT`
      - `EMAIL_FROM`
      - `EMAIL_PASSWORD`
      - `EMAIL_TO`
4. Start the server:
```bash
node app.js
```

## Usage:
### Uploading a File
- Make a POST request to /upload endpoint with a file attached.
- Example using cURL:
```bash
curl --location 'http://localhost:3000/upload' \
--form 'file=@"/path/to/your/file.jpg"'
```
_Note: Replace `/path/to/your/file.jpg` with the path to the file you want to upload._