import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { config } from '../config/default';
import { Client } from '../entity/client.entity';
import { dataSource } from '../utils/connection';

const { accessTokenPrivateKey } = config;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: accessTokenPrivateKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await dataSource.getRepository(Client).findOne({
        where: { id: jwtPayload?.id, email: jwtPayload?.email },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
