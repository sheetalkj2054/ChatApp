import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen pt-20 container mx-auto px-4 max-w-5xl">
      <h2 className="text-lg font-semibold mb-2">Theme</h2>
      <p className="text-sm text-base-content/70 mb-4">
        Choose a theme for your chat interface
      </p>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-8">
        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`p-2 rounded-lg ${
              theme === t ? "bg-base-200" : "hover:bg-base-200/50"
            }`}
          >
            <div className="h-8 rounded-md overflow-hidden" data-theme={t}>
              <div className="grid grid-cols-4 gap-px p-1 h-full">
                <div className="bg-primary rounded" />
                <div className="bg-secondary rounded" />
                <div className="bg-accent rounded" />
                <div className="bg-neutral rounded" />
              </div>
            </div>
            <p className="text-xs mt-1 capitalize">{t}</p>
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3">Preview</h3>
      <div className="border rounded-xl overflow-hidden">
        <div className="p-4 space-y-3">
          {PREVIEW_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.isSent
                    ? "bg-primary text-primary-content"
                    : "bg-base-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <input
            className="input input-bordered flex-1"
            value="This is a preview"
            readOnly
          />
          <button className="btn btn-primary">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
