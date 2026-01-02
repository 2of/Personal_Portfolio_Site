

import { AlertMenuProvider } from "./AlertContext";
import { DarkModeProvider, useDarkMode } from "./DarkMode";
import { ModalMenuProvider } from "./ModalContext";
import { ScreenSizeProvider, useScreenSize } from "./ScreenSizeContext";
import { ThemeProvider } from "./ThemeProvider";
import {
    baseTheme,
    darkTheme,
    hiddenNavHeight,
    inlineNavHeight,
    lightTheme,
} from "../style/Theme"
import React from "react";
import { AppThemeProvider } from "./ThemeContext";
import { NavProvider } from "./NavContext";
import { LinksProvider } from "./LinksContext";
import { ContentProvider } from "./ContentContext";
import { NavStackProvider } from "./NavigationButtonsStack";

function InnerThemeWrapper({ children }) {
    const { darkMode: isDark } = useDarkMode();
    const floatingNav = true;
    const screenSize = useScreenSize();

    const theme = React.useMemo(() => {
        let navTheme;
        if (floatingNav) {
            // navTheme = hiddenNavHeight;
        } else {
            navTheme = screenSize !== "sm" ? hiddenNavHeight : inlineNavHeight;
        }

        const result = {
            ...baseTheme,
            ...navTheme,
            ...(isDark ? darkTheme : lightTheme),
        };


        return result;
    }, [screenSize, floatingNav, isDark]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export const ContextWrapper = ({ children }) => {
    // const screenSize = useScreenSize();
    return (
        <DarkModeProvider>
        
            <AlertMenuProvider>
                <ContentProvider>
                <LinksProvider>
                    <AppThemeProvider>
                        <NavProvider>
                        <NavStackProvider>
                            <ModalMenuProvider>
                                <ScreenSizeProvider>
                                    <ThemeProvider>

                                        <InnerThemeWrapper>{children}</InnerThemeWrapper>

                                    </ThemeProvider>
                                </ScreenSizeProvider>
                            </ModalMenuProvider>
</NavStackProvider>
                        </NavProvider>
                    </AppThemeProvider>
                </LinksProvider>
                </ContentProvider>
            </AlertMenuProvider>
        </DarkModeProvider>
    );
};
