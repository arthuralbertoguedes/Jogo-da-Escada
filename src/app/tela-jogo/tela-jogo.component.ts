import { Component, OnInit } from '@angular/core';
import { typeWithParameters } from '../../../node_modules/@angular/compiler/src/render3/util';

@Component({
  selector: 'app-tela-jogo',
  templateUrl: './tela-jogo.component.html',
  styleUrls: ['./tela-jogo.component.css']
})
export class TelaJogoComponent implements OnInit {

      public posicaoAtualJogador1 : number = 1;
      public posicaoAtualJogador2 : number = 1;
      public numeroSorteado       : any = "0";
      public vezJogador           : number;
      public botaoHabilitado      : boolean;
      public buracos              : string[] = ['4','6','7','9'];
      public voltarInicio         : boolean;
      public jogarNovamente       : boolean;
      public ratoVezJogada        : string;
      public vencedor             : string;
      public fimDeJogo            : boolean
      public primeiraVezJogar     : boolean;
      
      constructor() {
            this.primeiraVezJogar = true;
            this.vezJogador       = 1;
            this.botaoHabilitado  = true;
            this.voltarInicio     = false;
            this.jogarNovamente   = false;
            this.ratoVezJogada    = 'Rato branco';
            this.vencedor         = "";
            this.fimDeJogo        = true;
      }

      ngOnInit() {}

      comecarJogo(){
            this.vezJogador       = 1;
            this.botaoHabilitado  = true;
            this.voltarInicio     = false;
            this.jogarNovamente   = false;
            this.ratoVezJogada    = 'Rato branco';
            this.vencedor         = "";
            this.fimDeJogo        = false;
            this.posicaoAtualJogador1 = 1;
            this.posicaoAtualJogador2 = 1;
            this.numeroSorteado = 0;
      }


      //Função que troca a vez do jogador
      novaRodada() : void{
          if(this.vezJogador == 2){
              this.vezJogador = 1;
              this.ratoVezJogada = 'Rato branco';
              
          }    
          else{    
              this.vezJogador = 2;
              this.ratoVezJogada = 'Rato cinza';
          }       
      }    

      //Função para desabilitar botão no momento do sorteio do novo número
      jogar(botao) : any{
          this.voltarInicio = false;
          this.jogarNovamente = false;
          this.botaoHabilitado = false;
          setTimeout(()=>{
              this.botaoHabilitado = true;
          },2000);
          this.sortearNumero();
      }



      //Função para sortear número do jogador
      sortearNumero() : void {
            
            //Efeito de animação de sorteio
            let intervalo = setInterval(()=>{
                  this.numeroSorteado = Math.floor(Math.random() * 9 + 1);
                  
            },80);
            
            setTimeout(()=>{
                  this.numeroSorteado = Math.floor(Math.random() * 3 + 1);
                  this.movimentarPersonagem(intervalo);
            },2000)
          
        }


      //Função para movimentar o personagem da vez baseado no número sorteado  
    movimentarPersonagem(intervalo : any) : void{

          clearInterval(intervalo);

          if(this.vezJogador==1){
                //Verifica se ganhou
                if(this.posicaoAtualJogador1 + this.numeroSorteado >= 10){
                    this.fimDeJogo = true;
                    this.vencedor = "rato1";
                    this.primeiraVezJogar = false;
                }

                //Verifica se o jogador vai cair num buraco
                //Verifica se existe buraco na proxima movimentação do jogador
               if(this.buracos.indexOf(String(this.posicaoAtualJogador1 + this.numeroSorteado))>-1){
                    //Pegando casa do buraco para animação
                    let posicaoBuraco1 = this.posicaoAtualJogador1 + this.numeroSorteado;
                    let divBuraco = document.getElementById(`casaDireita${posicaoBuraco1}`);
                    divBuraco.style.animation = "piscarBorda 1.5s 3";
                    setTimeout(()=>{
                        divBuraco.style.animation = "none";
                    },4000)
              
                    //Voltando jogador ao início
                    this.posicaoAtualJogador1=1;
                    this.voltarInicio = true;
                    this.novaRodada();
               }
               else{
                    this.posicaoAtualJogador1 = this.posicaoAtualJogador1 + this.numeroSorteado;

                    //Jogar novamente se o jogador tirar o número 1
                    if(this.numeroSorteado===1){
                        this.vezJogador = 2;
                        this.jogarNovamente = true;
                        this.novaRodada();
                    }     
                    else{
                            this.novaRodada();
                    }   
               }
                
               
          }
          else{
                if(this.posicaoAtualJogador2 + this.numeroSorteado >= 10){
                    this.fimDeJogo = true;
                    this.vencedor = "rato2";
                    this.primeiraVezJogar = false;
                }


                //Verifica se o jogador vai cair num buraco
                if(this.buracos.indexOf(String(this.posicaoAtualJogador2 + this.numeroSorteado))>-1){

                    
                    let posicaoBuraco2 = this.posicaoAtualJogador2 + this.numeroSorteado;
                    console.log(posicaoBuraco2)
                    console.log(`casaEsquerda${posicaoBuraco2}`)
                    let divBuraco = document.getElementById(`casaEsquerda${posicaoBuraco2}`);
                    divBuraco.style.animation = "piscarBorda 1.5s 3";
                    setTimeout(()=>{
                        divBuraco.style.animation = "none";
                    },4000)
                   

                    this.posicaoAtualJogador2=1;
                    this.voltarInicio = true;
                    this.novaRodada();
                }
                else{
                    this.posicaoAtualJogador2 = this.posicaoAtualJogador2 + this.numeroSorteado;
                    if(this.numeroSorteado===1){
                        this.vezJogador=1;
                        this.jogarNovamente = true;
                        this.novaRodada();
                    }    
                    else{
                         this.novaRodada();
                    }     
                }
          
         }  
    }

}
