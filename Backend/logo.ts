export function logo(port: number, services: string) {
      console.log("                                             ")
  console.log("       Nevercomex Development Team Presents:");
  console.log(`
             ███╗   ██╗  ██╗  ██╗                    
             ████╗  ██║  ╚██╗██╔╝                    
             ██╔██╗ ██║   ╚███╔╝                     
             ██║╚██╗██║   ██╔██╗                     
             ██║ ╚████║  ██╔╝ ██╗                    
             ╚═╝  ╚═══╝  ╚═╝  ╚═╝                    
`);
  console.log("                 " + services.toUpperCase() + " SERVER");
  console.log(" ====================================================");
  console.log(` =   Server [${services.toUpperCase()}] is running on port: ${port}         =`);
  console.log(" ====================================================");
    console.log("                                             ")
}