package com.example.maquina_de_comida;

//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//@SpringBootApplication
//public class DoceController {
//
//	public static void main(String[] args) {
//		SpringApplication.run(DoceController.class, args);
//	}
//
//}

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/maquinas")
public class DoceController {

	private final Map<String, Maquina> maquinas = new HashMap<>();

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

