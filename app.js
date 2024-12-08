let total = document.getElementById("valor-total");
let carrinho = document.getElementById("lista-produtos");
let produtos = [];

function adicionar() {
    let produto = document.getElementById("produto").value;
    let [produtoNome, produtoValor] = produto.split(" - ");
    let valorProduto = parseFloat(produtoValor.replace("R$", ""));
    let quantidade = parseInt(document.getElementById("quantidade").value) || 1;

    // Ele vai ver se ja tem o mesmo produto no carrinho
    let produtoExistente = produtos.find(produto => produto.nome === produtoNome);

    // se já tiver um produto ele vai somar a quantidade existente com as novas
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;

        // Atualiza o DOM
        let elementoProduto = document.querySelector(`[data-produto="${produtoNome}"]`);
        elementoProduto.querySelector(".quantidade").textContent = `${produtoExistente.quantidade}x`;
    } else {
        // Adiciona o novo produto no array
        produtos.push({
            nome: produtoNome,
            valor: valorProduto,
            quantidade: quantidade
        });

        // Cria um novo DOM
        let novoProduto = document.createElement("div");
        novoProduto.className = "carrinho__produtos__produto";
        novoProduto.setAttribute("data-produto", produtoNome);
        novoProduto.innerHTML = `
            <span class="texto-azul quantidade">${quantidade}x</span> 
            ${produtoNome} 
            <span class="texto-azul preco">R$:${(valorProduto * quantidade).toFixed(2)}</span>`;
        carrinho.appendChild(novoProduto);
    }

    // Atualiza o valor total
    let valorTotal = produtos.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
    total.textContent = `Total: R$:${valorTotal.toFixed(2)}`;
}

function limpar() {
    produtos = [];
    carrinho.innerHTML = ``;
    total.innerHTML = `<span id="valor-total"></span><span class="texto-azul">ADICIONE ALGO NO CARRINHO!!!</span>`;
}
