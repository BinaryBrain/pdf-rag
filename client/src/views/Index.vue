<template>
  <div class="index">
    <div class="logo">
      <h1>PromptMe</h1>
      <p>Simple Solution, Powerful Results</p>
    </div>
    <div class="messages">
      <p>This tool will help you answer your question using the given documentation and information.</p>
      <div class="message" v-for="message in messages">
        <div class="sender"><strong>{{ message.sender }}</strong></div>
        <Markdown class="text" :source="message.text" />
        <p v-if="message.sources"><br><strong>Sources:</strong></p>
        <ul v-if="message.sources">
          <li v-for="source in message.sources">{{ source }}</li>
        </ul>
      </div>
    </div>
    <form class="input-zone" @submit="onsubmit">
      <input type="text" class="prompt" placeholder="Your question">
      <button class="submit">Send!</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Markdown from 'vue3-markdown-it';

const messages = reactive([{
  sender: "PromptMe",
  text: "Hi! How can I assist you today?",
  sources: undefined,
}]);

function onsubmit(e: any) {
  e.preventDefault();
  const prompt: string = e.target[0].value;
  e.target[0].value = "";

  fetch(`http://localhost:3000/prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json())
    .then((res) => {
      messages.push({
        sender: "PromptMe",
        text: res.text,
        sources: res.sources.map(s => `${s.filename}, page ${s.page}`),
      });
    });

  messages.push({
    sender: "You",
    text: prompt,
    sources: undefined,
  });
}
</script>

<style>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
}

.sender {
  color: #71D4A0;
}

.message {
  margin: 1.5em 0;
}

.input-zone {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1em;
}

.prompt {
  margin-right: 1em;
  flex-grow: 1;
  outline: none;
  background: transparent;
  border: 1px solid #71D4A0;
  padding: 1em;
  border-radius: 100px;
  color: white;
}

.submit {
  border-radius: 0;
  background: #71D4A0;
  color: black;
  border: none;
  border-radius: 100px;
  padding: 1em;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 400px) {
  .logo {
    font-size: 0.8em;
  }
}

.logo {
  color: #71D4A0;
  text-align: center;
  margin-bottom: 3em;
}

.logo h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 3em;
  line-height: 1.1em;
}

.logo p {
  font-family: 'Questrial', sans-serif;
  font-size: 1em;
  letter-spacing: 0.3ch;
}
</style>
