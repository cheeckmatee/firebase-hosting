const admin = require("firebase-admin");
const fs = require("fs");

// تحميل مفاتيح Firebase
const serviceAccount = JSON.parse(fs.readFileSync("tavokey.json", "utf8"));

// تهيئة Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// بناء الهيكلة بدون بيانات
const schema = {
  "Users": [
    { "ID": 0, "name": "", "email": "", "phone": "" }
  ],
  "Addresses": [
    { "ID": 0, "user_id": 0, "address_line": "", "city": "", "latitude": 0.0, "longitude": 0.0 }
  ],
  "Orders": [
    { "ID": 0, "user_id": 0, "product": "", "quantity": 0, "order_date": "" }
  ],
  "Payments": [
    { "ID": 0, "order_id": 0, "amount": 0.00, "payment_method": "" }
  ]
};

// إنشاء الهيكلة فقط في Firestore بدون بيانات فعلية
async function createSchema() {
  for (const [collectionName, documents] of Object.entries(schema)) {
    const collectionRef = db.collection(collectionName);

    // إضافة مستند افتراضي فقط للحفاظ على البنية
    const docRef = collectionRef.doc("template");
    await docRef.set(documents[0]);

    console.log(`✅ تم إنشاء الهيكلة للمجموعة: ${collectionName}`);
  }
}

createSchema()
  .then(() => console.log("🎉 تم إنشاء البنية في Firestore بنجاح!"))
  .catch((error) => console.error("❌ خطأ أثناء الإنشاء:", error));