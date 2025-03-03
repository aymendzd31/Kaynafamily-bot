const express = require("express");
const mineflayer = require("mineflayer");

const app = express();

// إعداد خادم Express للحفاظ على عمل Replit
app.get("/", (req, res) => {
  res.send("✅ Bot is running and online!");
});

app.listen(3000, () => {
  console.log("🌐 Express server is running on port 3000");
});

// إعداد البوت للدخول إلى سيرفر ماين كرافت
const bot = mineflayer.createBot({
    host: "KAYNAFAMILY.aternos.me", // عنوان السيرفر
    port: 26333, // بورت السيرفر
    username: "KeepAliveBot", // اسم البوت
    version: "1.21.4" // إصدار ماين كرافت
});

// عند تسجيل الدخول
bot.on("login", () => {
    console.log("✅ البوت دخل إلى السيرفر!");
    bot.chat("/login كلمة_السر"); // أضف كلمة سر إذا كان السيرفر يحتاج تسجيل دخول
});

// عند طرد البوت أو انقطاع الاتصال
bot.on("end", () => {
    console.log("❌ تم طرد البوت، سيعيد الاتصال خلال 5 ثواني...");
    setTimeout(() => reconnectBot(), 5000);
});

// عند حدوث خطأ
bot.on("error", (err) => {
    console.log(`⚠️ خطأ: ${err.message}`);
});

// وظيفة إعادة تشغيل البوت
function reconnectBot() {
    bot.quit();
    setTimeout(() => {
        const newBot = mineflayer.createBot({
            host: "KAYNAFAMILY.aternos.me",
            port: 26333,
            username: "Aymen_Bot",
            version: "1.21.4"
        });

        newBot.on("login", () => {
            console.log("✅ البوت عاد إلى السيرفر!");
        });

        newBot.on("end", () => {
            console.log("❌ تم طرد البوت، سيعيد الاتصال...");
            setTimeout(() => reconnectBot(), 5000);
        });

        newBot.on("error", (err) => {
            console.log(`⚠️ خطأ: ${err.message}`);
        });
    }, 5000);
}

// تأكيد أن Replit لا يتوقف بسبب عدم النشاط
setInterval(() => {
    console.log("Bot is running...");
}, 60000);