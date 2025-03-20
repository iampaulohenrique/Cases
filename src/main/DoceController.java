package com.example.doce;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/maquinas")

public class DoceController {

    private final Maquina maquina1 = new Maquina("Máquina 1");
    private final Maquina maquina2 = new Maquina("Máquina 2");

    @PostMapping("/{nome}/adicionarMoeda")
    public String adicionarMoeda(@PathVariable String nome, @RequestBody int valor) {
        Maquina maquina = getMaquina(nome);
        if (maquina == null) {
            return "Máquina não encontrada!";
        }
        maquina.adicionarMoeda(valor);
        return "Moeda de R$" + valor + " adicionada. Saldo atual: R$" + maquina.getSaldo();
    }

    @PostMapping("/{nome}/comprarDoce")
    public String comprarDoce(@PathVariable String nome, @RequestBody String tipo) {
        Maquina maquina = getMaquina(nome);
        if (maquina == null) {
            return "Máquina não encontrada!";
        }
        return maquina.comprarDoce(tipo);
    }

    private Maquina getMaquina(String nome) {
        if ("maquina1".equalsIgnoreCase(nome)) {
            return maquina1;
        } else if ("maquina2".equalsIgnoreCase(nome)) {
            return maquina2;
        }
        return null;
    }
}
