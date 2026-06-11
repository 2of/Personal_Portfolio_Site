

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
import { ToastMenuProvider } from "./ToastContext";
import { StateProvider } from "./StateContext";
import { TransitionProvider } from "./PageTransition";
import { ToolTip } from "../ui/misc/Tooltip";
import { TooltipProvider } from "./ToolTipContext";

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
            <StateProvider>
                <TooltipProvider>
                <ScreenSizeProvider>
                    <TransitionProvider>

                        <ToastMenuProvider>
                            <AlertMenuProvider>
                                <ContentProvider>
                                    <LinksProvider>
                                        <AppThemeProvider>
                                            <NavProvider>
                                                <NavStackProvider>
                                                    <ModalMenuProvider>

                                                        <ThemeProvider>

                                                            <InnerThemeWrapper>{children}</InnerThemeWrapper>

                                                        </ThemeProvider>

                                                    </ModalMenuProvider>
                                                </NavStackProvider>
                                            </NavProvider>
                                        </AppThemeProvider>
                                    </LinksProvider>
                                </ContentProvider>
                            </AlertMenuProvider>
                        </ToastMenuProvider>
                    </TransitionProvider>
                </ScreenSizeProvider>
</TooltipProvider>
            </StateProvider>
        </DarkModeProvider>
    );
};
