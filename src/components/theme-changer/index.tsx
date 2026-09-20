import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { SanitizedThemeConfig } from '../../interfaces/sanitized-config';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';
import { skeleton } from '../../utils';

/**
 * Renders a theme changer component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.theme - The current theme.
 * @param {function} props.setTheme - A function to set the theme.
 * @param {boolean} props.loading - Whether the component is in a loading state.
 * @param {SanitizedThemeConfig} props.themeConfig - The theme configuration object.
 * @return {JSX.Element} The rendered theme changer component.
 */
const ThemeChanger = ({
  theme,
  setTheme,
  loading,
  themeConfig,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  themeConfig: SanitizedThemeConfig;
}) => {
  const changeTheme = () => {
    const selectedTheme =
      theme === 'dark' ? themeConfig.defaultTheme : 'dark';

    document.querySelector('html')?.setAttribute('data-theme', selectedTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, selectedTheme);
    }

    setTheme(selectedTheme);
  };

  return (
    <div className="card overflow-visible shadow-lg card-sm bg-base-100">
      <div className="flex-row items-center space-x-4 flex pl-6 pr-2 py-4">
        <div className="flex-1">
          <h5 className="card-title">
            {loading ? (
              skeleton({
                widthCls: 'w-20',
                heightCls: 'h-8',
                className: 'mb-1',
              })
            ) : (
              <span className="text-base-content opacity-70">Theme</span>
            )}
          </h5>
          <span className="text-base-content/50 capitalize text-sm">
            {loading
              ? skeleton({ widthCls: 'w-16', heightCls: 'h-5' })
              : theme === themeConfig.defaultTheme
                ? 'Default'
                : theme}
          </span>
        </div>
        <div className="flex-0">
          {loading ? (
            skeleton({
              widthCls: 'w-12',
              heightCls: 'h-10',
              className: 'mr-6',
            })
          ) : (
            <button
              type="button"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              }
              onClick={changeTheme}
              className="btn btn-ghost btn-circle text-base-content opacity-70"
            >
              {theme === 'dark' ? (
                <MdLightMode className="h-5 w-5" />
              ) : (
                <MdDarkMode className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
