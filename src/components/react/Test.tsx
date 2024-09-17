import i18next from "i18next";
import { useTranslation } from "react-i18next";

export const TestComponent = () => {
  const { t } = useTranslation("translation");
  console.log(t("nav.home"), i18next.language, "asdsadasfvdsafskmll");

  return <div>{t("nav.home")}</div>;
};
