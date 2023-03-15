import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainLayout } from 'layouts/MainLayout';
import { FullPageLoading } from 'components/FullPageLoading';
import SupportProvider from 'components/layout/Support';
import { Routes } from '../../../constants/routes';

const Homepage = lazy(() => import('../../../pages/Homepage'));
const Profile = lazy(() => import('../../../pages/Profile'));
const Casino = lazy(() => import('../../../pages/Casino'));
const GameSlug = lazy(() => import('../../../pages/Game'));
const PromotionsLanding = lazy(() => import('../../../pages/Promotions/Landing'));
const Promotions = lazy(() => import('../../../pages/Promotions'));
const Games = lazy(() => import('../../../pages/Games'));
const LiveCasino = lazy(() => import('../../../pages/LiveCasino'));
const Affiliate = lazy(() => import('../../../pages/Affiliate'));
const AboutUs = lazy(() => import('../../../pages/AboutUs'));
const Terms = lazy(() => import('../../../pages/Terms'));
const FAQ = lazy(() => import('../../../pages/FAQ'));
const Policy = lazy(() => import('../../../pages/Policy'));
const Aml = lazy(() => import('../../../pages/AML'));
const Contact = lazy(() => import('../../../pages/Contact'));
const RNG = lazy(() => import('../../../pages/RNG'));
const Gambling = lazy(() => import('../../../pages/Gambling'));
const Poker = lazy(() => import('../../../pages/Poker'));
const Sport = lazy(() => import('../../../pages/Sports'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage'));

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <SupportProvider>
    <MainLayout>
      <Suspense fallback={<FullPageLoading />}>
        <Switch>
          <Route exact path={Routes.Homepage} component={Homepage} />
          <Route exact path={Routes.Profile} component={Profile} />
          <Route exact path={Routes.Casino} component={Casino} />
          <Route exact path={Routes.CasinoSlug} component={GameSlug} />
          <Route exact path={Routes.PromotionsLanding} component={PromotionsLanding} />
          <Route exact path={Routes.Promotions} component={Promotions} />
          <Route exact path={Routes.GamesSlug} component={GameSlug} />
          <Route exact path={Routes.Games} component={Games} />
          <Route exact path={Routes.LiveCasino} component={LiveCasino} />
          <Route exact path={Routes.LiveCasinoSlug} component={GameSlug} />
          <Route exact path={Routes.Affiliate} component={Affiliate} />
          <Route exact path={Routes.AboutUs} component={AboutUs} />
          <Route exact path={Routes.Terms} component={Terms} />
          <Route exact path={Routes.FAQ} component={FAQ} />
          <Route exact path={Routes.POLICY} component={Policy} />
          <Route exact path={Routes.AML} component={Aml} />
          <Route exact path={Routes.CONTACT} component={Contact} />
          <Route exact path={Routes.RNG} component={RNG} />
          <Route exact path={Routes.GAMBLING} component={Gambling} />
          <Route exact path={Routes.POKER} component={Poker} />
          <Route exact path={Routes.SPORT} component={Sport} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </MainLayout>
  </SupportProvider>
);

export { MainRouter };
