import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Edit2 } from "lucide-react";
import { adminApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const cmsSections = [
  {
    key: "home.hero.title",
    label: "Hero Title",
    section: "Home - Hero Section",
    placeholder: "A cinematic retreat for stays...",
  },
  {
    key: "home.hero.description",
    label: "Hero Description",
    section: "Home - Hero Section",
    placeholder: "Chhapak Resort blends still water...",
    multiline: true,
  },
  {
    key: "home.about.body",
    label: "About Section Text",
    section: "Home - About Section",
    placeholder: "Designed with a hospitality-first mindset...",
    multiline: true,
  },
];

export default function AdminCMS() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await adminApi.getCmsContent();
      const contentMap = {};
      (response.data.data || []).forEach((item) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key) => {
    setSaving(true);
    try {
      await adminApi.updateCmsContent(key, content[key]);
      setSaved((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (err) {
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Content Management</h1>
        <p className="text-slate-600">Edit website content and text</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Tip</h3>
        <p className="text-sm text-blue-700">
          Changes made here will immediately reflect on the live website. 
          Make sure to preview changes before saving.
        </p>
      </div>

      <div className="space-y-6">
        {cmsSections.map((section) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{section.section}</p>
                <h3 className="text-lg font-bold text-charcoal">{section.label}</h3>
              </div>
              <Button
                size="sm"
                onClick={() => handleSave(section.key)}
                disabled={saving}
              >
                {saved[section.key] ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>

            {section.multiline ? (
              <textarea
                value={content[section.key] || ""}
                onChange={(e) => setContent({ ...content, [section.key]: e.target.value })}
                placeholder={section.placeholder}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 resize-none transition-all"
              />
            ) : (
              <input
                type="text"
                value={content[section.key] || ""}
                onChange={(e) => setContent({ ...content, [section.key]: e.target.value })}
                placeholder={section.placeholder}
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 transition-all"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
