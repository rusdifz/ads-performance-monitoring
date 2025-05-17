// import { runSeeder } from 'typeorm-extension';

// import { AppDataSource } from './data-source';
// import { UserSeeder } from './user.seeder';
// import { AdsClientContractSeeder } from './ads-performance.seeder';

// async function run() {
//   await AppDataSource.initialize();

//   await runSeeder(AppDataSource, UserSeeder);
//   await runSeeder(AppDataSource, AdsClientContractSeeder);

//   await AppDataSource.destroy();
// }

// run()
//   .then(() => {
//     console.log('Seeding selesai!');
//   })
//   .catch((error) => {
//     console.error('Error saat seeding:', error);
//   });
