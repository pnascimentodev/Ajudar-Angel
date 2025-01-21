import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://ajudar-angel.vercel.app/enviar-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert('Mensagem enviada com sucesso!');
      setFormData({ nome: '', email: '', mensagem: '' });
    } else {
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <div className="container">
      {/* Título "Ajude a Angel" em rosa */}
      <h2 className="title">Ajude a Salvar a Angel!</h2>

      {/* Gif com animação e tamanho ajustado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="tenor-gif"
        dangerouslySetInnerHTML={{
          __html: `<div class="tenor-gif-embed" data-postid="24017334" data-share-method="host" data-aspect-ratio="0.965625" data-width="80%">
                      <a href="https://tenor.com/view/pixel-cat-gif-24017334">Pixel Cat Sticker</a> 
                      from <a href="https://tenor.com/search/pixel-stickers">Pixel Stickers</a>
                   </div>`,
        }}
      />

      <p>
        Olá, venho pedir ajuda para minha gatinha Angel, que está enfrentando um momento delicado.
        Descobrimos que ela tem um tumor na mama, e agora precisamos realizar uma radiografia e uma ultrassonografia
        para entender melhor sua situação e conseguirmos seguir com a mastecnomia dela.
      </p>

      <p>
        Não estamos pedindo dinheiro, apenas buscamos alguém que possa ajudar com esses exames,
        seja um veterinário, uma clínica que possa oferecer os procedimentos, ou alguém que conheça quem possa nos ajudar.
      </p>

      <p>
        Angel é muito especial para nós, e queremos fazer tudo que estiver ao nosso alcance para garantir sua saúde e bem-estar.
        Qualquer ajuda será imensamente bem-vinda! Caso você possa ajudar ou conheça alguém que possa, por favor, entre em contato.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Seu Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensagem"
          placeholder="Sua Mensagem"
          rows="4"
          value={formData.mensagem}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <h2 className="title">Compartilhar essa mensagem também pode fazer toda a diferença. </h2>
      <h2 className="title">Vamos juntos salvar da Angel!</h2>

      <p>
        Se estiver se sentindo confortável, você pode doar qualquer valor pelo Pix. 
        <span className="pix-highlight"> Chave: contatoajudeagegel@gmail.com</span>
      </p>

    </div>
  );
}

export default App;
