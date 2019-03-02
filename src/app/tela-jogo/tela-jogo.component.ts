import { Component, OnInit } from '@angular/core';

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

      constructor() {
          this.vezJogador = 1;
          this.botaoHabilitado = true;
      }

      ngOnInit() {
      }


      novaRodada() : void{
          if(this.vezJogador == 2){
              this.vezJogador = 1;
          }    
          else{    
              this.vezJogador = 2;
          }       
      }    


      jogar(botao) : any{
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


      movimentarPersonagem(intervalo : any) : void{

          clearInterval(intervalo);

          if(this.vezJogador==1){
               this.posicaoAtualJogador1 = this.posicaoAtualJogador1 + this.numeroSorteado;
               //Jogar novamente se o jogador tirar o número 1
               if(this.numeroSorteado===1){
                    this.vezJogador=2;
                    this.novaRodada();
               }     
               else{
                    this.novaRodada();
               }     
               
          }
          else{
                this.posicaoAtualJogador2 = this.posicaoAtualJogador2 + this.numeroSorteado;

                if(this.numeroSorteado===1){
                    this.vezJogador=1;
                    this.novaRodada();
                }    
                else{
                     this.novaRodada();
                }     
          }  
      }




}
