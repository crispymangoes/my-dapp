async function main() {
    // We get the contract to deploy
    const Storage = await ethers.getContractFactory("StorageBoi");
    const storage = await Storage.deploy();
  
    console.log("StorageBoi deployed to:", storage.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });