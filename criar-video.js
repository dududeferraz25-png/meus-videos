const { execSync } = require("child_process");
const cmd = "ffmpeg -y -f lavfi -i color=c=navy:s=1080x1920:d=5 -vf \"drawtext=text='DILEMAS DA CIDADE':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=200,drawtext=text='Mochila com dinheiro':fontcolor=yellow:fontsize=42:x=(w-text_w)/2:y=400,drawtext=text='A) Devolver':fontcolor=white:fontsize=48:x=150:y=1400,drawtext=text='B) Ficar':fontcolor=white:fontsize=48:x=700:y=1400\" -c:v libx264 -t 5 video_dilema_final.mp4";
try {
  execSync(cmd, { stdio: "inherit" });
  console.log("\n[Sucesso Absoluto!] Video gerado com sucesso!");
} catch (e) {
  console.log("Erro:", e.message);
}
