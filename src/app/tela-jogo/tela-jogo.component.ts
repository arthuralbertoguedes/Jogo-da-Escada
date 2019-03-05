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
      public numeroSorteado : any = "0";
      public vezJogador : number;
      public botaoHabilitado : boolean;
      public buracos : string[] = ['4','6','7','9'];
      public voltarInicio : boolean;
      public jogarNovamente : boolean;
      public ratoVezJogada : string;

      constructor() {
          this.vezJogador = 1;
          this.botaoHabilitado = true;
          this.voltarInicio = false;
          this.jogarNovamente = false;
          this.ratoVezJogada = 'Rato branco';
      }

      ngOnInit() {
          
      
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

                if(this.posicaoAtualJogador1 + this.numeroSorteado >= 10){
                    alert('Voce ganhou!!');
                }

                //Verifica se o jogador vai cair num buraco
               if(this.buracos.indexOf(String(this.posicaoAtualJogador1 + this.numeroSorteado))>-1){
                    let posicaoBuraco1 = this.posicaoAtualJogador1 + this.numeroSorteado;
                    
                    let divBuraco = document.getElementById(`casaDireita${posicaoBuraco1}`);
                    divBuraco.style.animation = "piscarBorda 1.5s 3";
                    setTimeout(()=>{
                        divBuraco.style.animation = "none";
                    },4000)
                   
                    
                    
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
