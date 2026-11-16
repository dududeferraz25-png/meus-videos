
const { execSync } = require('child_process');

const dilemas = [
    { id: 1, texto: "Mochila com dinheiro achada na rua. Devolve ao dono ou fica com o dinheiro?" },
    { id: 2, texto: "Carro na contramão ou desviar pela calçada? Escolha o seu caminho." },
    { id: 3, texto: "Carteira no chão de um desconhecido. Você avisa ou guarda?" }
];

console.log("=== INICIANDO PRODUÇÃO COM BONECO E VOZ ===");

dilemas.forEach((d) => {
    console.log(`\n🎙️ A gerar áudio para o Episódio ${d.id}...`);
    const audioFile = `audio_${d.id}.mp3`;
    const videoFile = `episodio_${d.id}.mp4`;

    try {
        execSync(`edge-tts --voice pt-BR-AntonioNeural --text "${d.texto}" --write-media ${audioFile}`);

        console.log(`🎬 A montar o vídeo ${d.id} com a imagem boneco.jpg...`);
        const cmdFFmpeg = `ffmpeg -y -loop 1 -i boneco.jpg -i ${audioFile} -c:v libx264 -tune stillimage -c:a aac -b:a 192k -shortest -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black" ${videoFile}`;
        execSync(cmdFFmpeg, { stdio: 'inherit' });

        execSync(`cp ${videoFile} ~/storage/downloads/`);
        console.log(`[Sucesso] Episódio ${d.id} gerado com o boneco e copiado para os Downloads!`);
    } catch (e) {
        console.log(`Erro no episódio ${d.id}:`, e.message);
    }
});

console.log("\n=== SÉRIE CONCLUÍDA COM SUCESSO! ===");

