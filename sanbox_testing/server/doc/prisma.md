## เพื่อการติดตั้ง Prisma ต้องติดตั้งผ่าน npm โดยใช้คำสั่ง
	 npm install prisma tsx --save-dev
## เริ่มให้ project ใช้ Prisma โดยใช้คำสั่ง
	npx prisma init

## เชื่อมต่อกับฐานข้อมูลโดยใช้คำสั่ง
	npx prisma migrate dev --name init

## นำ SQL ไปรันใน Plesk ผ่าน phpMyAdmin หรือเครื่องมือจัดการฐานข้อมูล
	npx prisma migrate dev --name init --create-only

## Reset Database 
	npx prisma migrate reset
## คำสั่ง seed
	npm run seed

## ใช้ prisma db push แทนการ Migrate
	npx prisma db push

## จัด Format prisma
	npx prisma format

## Migrate the Database
npx prisma migrate dev --name fix_schema_relations

## รหัสผ่าน Prisma ห้ามขึ้นด้วยตัวเลขต้องเป็นตัวอักษรก่อน