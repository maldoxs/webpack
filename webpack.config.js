const HtmlWebPack    = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin     = require("copy-webpack-plugin");

module.exports = {
   mode:'development',//estamos en modo de desarrollo

   output:{
      clean:true//borra todos los archivos creados y los vuelve a generar
   },

   module:{
      rules: [
        {
          test:/\.html$/,//busca todos los html del proyecto
          loader:'html-loader',//mueve el html
          options:{
            sources:false//si el archivo que movemos tuviera img etc,
            //tambien las moveria
          }
        },
        {
          test:/\.css$/,
          exclude: /styles.css$/,
          use:['style-loader', 'css-loader']//usamos los paketes instalados
        },
        {
          test:/styles.css$/,
          use:[MiniCssExtract.loader, 'css-loader']
          
        },
        {
          test: /\.(png|jpe?g|gif)$/,//exp regular evalua cualquier imagen sin importar donde este
          loader:'file-loader'
        }
        
      ]
   },
   
   optimization:{},

   plugins:[
      //crea el archivo index.html en el directorio(dist) 
      //que tenga relacion con el bundor q esta generando en este caso es main.js
      new HtmlWebPack({
        title: 'Mi Webpackc App',//titulo de la pagina
        filename:'index.html',//nombre de salida q queremos que se llama el archivo generado
        template:'./src/index.html'//archivo en el que queremos vasarnos es el index.html q esta dentro de src
      }),
      
      new MiniCssExtract({
        filename:'[name].css',
        ignoreOrder:false //ignora el orden
      }),
     //nos sirve para copiar y mover recursos
      new CopyPlugin({
        patterns:[
     //from = (desde)--> copie todo lo q esta ahi y el to = (destino)
          {from: 'src/assets/', to:'assets/'}//crea la carpeta assets dentro de dist
        ]
      })



   ]

}