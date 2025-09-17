# Love Site (GitHub Pages)
เว็บสวยโทนดวงดาวสำหรับแฟน พร้อม:
- จดหมาย
- โน้ตน่ารัก
- แกลเลอรี (ใส่รูปในโฟลเดอร์ `images/`)
- เพลย์ลิสต์
- Countdown
- Soft password gate (ฝั่ง client — เปลี่ยนรหัสได้ใน `script.js`)

## ใช้งานกับ GitHub Pages
1) สร้าง repo ใหม่ใน GitHub (public ก็ได้)
2) อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น repo (รวมถึง `index.html`, `style.css`, `script.js`, `og.png`, `favicon.ico` และโฟลเดอร์ images ถ้ามี)
3) ไปที่ Settings → Pages → เลือก Branch: `main` และ Folder: `/root` แล้ว Save
4) รอสักครู่ จะได้ลิงก์เว็บไซต์ เช่น `https://username.github.io/repo-name`

## ตั้งรหัสผ่าน (แบบง่าย)
เปิดไฟล์ `script.js` แล้วเปลี่ยนคำว่า `"earth-love"` ให้เป็นรหัสของคุณ
> หมายเหตุ: นี่เป็นการป้องกันแบบง่ายๆ เพื่อความเป็นส่วนตัว ไม่เหมาะกับข้อมูลลับสำคัญ

## แก้ข้อความ/รูป
- จดหมาย: อยู่ใน `index.html` (section id="letter")
- โน้ต: แก้ div class="note" หรือจะให้สคริปต์สุ่มข้อความก็ได้
- แกลเลอรี: เพิ่มไฟล์รูปใน `images/` และเพิ่มชื่อไฟล์ใน array `images` ใน `script.js`
- เพลย์ลิสต์: เปลี่ยน iframe ให้เป็น YouTube/Spotify ของคุณ
- Countdown: เปลี่ยน `NEXT_MEET_DATE` ใน `script.js` เป็นวันที่จะได้เจอกัน

## รูป OG และ Favicon
- เปลี่ยน `og.png` และ `favicon.ico` เป็นของคุณเองเพื่อให้พรีวิวใน LINE/แชตสวยขึ้น
