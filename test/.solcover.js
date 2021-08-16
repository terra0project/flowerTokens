import { cp } from 'shelljs';

export const skipFiles = ['./build/contracts/buyable.sol'];
export const providerOptions = {
    allowUnlimitedContractSize: true,
    default_balance_ether: 0x1fffffffffffff,
};
export async function onCompileComplete(config, deployer) {
    cp('./build/contracts/buyable.json', './.coverage_artifacts/contracts');
    console.log('---------------------------------------------------------------------');
    console.log('ABIs manually copied to ./.coverage_artifacts/contracts');
    console.log('---------------------------------------------------------------------');
}