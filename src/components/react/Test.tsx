import i18next from "i18next";
import { useTranslation } from "react-i18next";

export const TestComponent = () => {
  const { t } = useTranslation("translation");

  return <div>{t("nav.home")}</div>;
};
