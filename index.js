const express = require("express");
const mineflayer = require("mineflayer");

const app = express();
const port = process.env.PORT || 3000;  // استخدام المنفذ من البيئة أو الافتراضي 3000

// إعداد خادم Express للحفاظ على عمل Replit/Koyeb
app.get("/", (req, res) => {
  res.send("✅ Bot is running and online!");
});

app.listen(port, () => {
  console.log(`🌐 Express server is running on port ${port}`);
});

// إعداد البوت للدخول إلى سيرفر ماين كرافت
function createBot() {
  const bot = mineflayer.createBot({
      host: "KAYNAFAMILY.aternos.me", // عنوان السيرفر
      port: 26333, // بورت السيرفر
      username: "KeepAliveBot", // اسم البوت
      version: "1.21.4" // إصدار ماين كرافت
  });

  // عند تسجيل الدخول
  bot.on("login", () => {
      console.log("✅ البوت دخل إلى السيرفر!");
      bot.chat("/login كلمة_السر"); // تسجيل الدخول إذا كان السيرفر يحتاج كلمة سر
  });

  // عند طرد البوت أو انقطاع الاتصال
  bot.on("end", () => {
      console.log("❌ تم طرد البوت، سيعيد الاتصال خلال 5 ثواني...");
      setTimeout(createBot, 5000);
  });

  // عند حدوث خطأ
  bot.on("error", (err) => {
      console.log(`⚠️ خطأ: ${err.message}`);
  });
}

// تشغيل البوت
createBot();

// تأكيد أن Koyeb لا يتوقف بسبب عدم النشاط
setInterval(() => {
    console.log("Bot is running...");
}, 60000);
