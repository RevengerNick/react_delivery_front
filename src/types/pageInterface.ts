import { SelectedPage } from "@/types/SelectedPage";
import MainPage from "@/pages/MainPage/Main";
import CartPage from "@/pages/CartPage/";
import HistoryPage from "@/pages/HistoryPage";
import DiscountsPage from "@/pages/DiscountsPage";
import AddressesPage from "@/pages/AddressesPage";
import ProfilePage from "@/pages/ProfilePage";
import HelpPage from "@/pages/HelpPage";

const pageComponents = {
    [SelectedPage.Main]: MainPage,
    [SelectedPage.Cart]: CartPage,
    [SelectedPage.History]: HistoryPage,
    [SelectedPage.Discounts]: DiscountsPage,
    [SelectedPage.Addresses]: AddressesPage,
    [SelectedPage.Profile]: ProfilePage,
    [SelectedPage.Help]: HelpPage,
  };