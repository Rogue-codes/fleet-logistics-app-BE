import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from 'src/app.module';
// import { AppModule } from '../src/app.module';
import { AppModule } from '../app.module';
import { AdminController } from './admin.controller';
import { MailServiceService } from '../mail-service/mail-service.service';
import { adminProvider } from './admin.provider';
import { PasswordReset } from './model/passwordreset.model';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './admin.service';
describe('AdminController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AdminController],
      providers: [
        MailServiceService,
        PasswordReset,
        JwtService,
        AdminService,
        ...adminProvider,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/admin/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/admin/login')
      .send({
        email: 'nnamdidanielosuji@gmail.com',
        password: 'Test123@',
      })
      .expect(201);

    // Add assertions based on your application's behavior
    expect(response.body.access_token).toBeDefined();
    // You can also check other properties of the response or the user in the database
  });

  // it('/admin/register (POST)', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/auth/register')
  //     .send({
  //       email: 'nnamdiosuji0@gmail.com',
  //       password: 'newpassword',
  //     })
  //     .expect(201);

  //   console.log(response.body);

  //   // Add assertions based on your application's behavior
  //   expect(response.body.success).toBeTruthy();
  //   // You can also check other properties of the response or the user in the database
  // });
});
