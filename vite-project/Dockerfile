# Naudoja Node.js 20
FROM node:20

WORKDIR /app

# Nukopijuoja package.json
COPY package*.json ./

RUN npm install

# Nukopijuoja likusią projekto dalį
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]