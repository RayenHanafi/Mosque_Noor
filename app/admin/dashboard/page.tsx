"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import {
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Plus,
  Save,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";

interface AdminSettings {
  id: number;
  phone: string;
  email: string;
  jummah_time: string;
}

interface Announcement {
  id: number;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Settings state
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState<Partial<AdminSettings>>({});

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState<number | null>(
    null,
  );
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Check authentication with server
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include", // Include cookies
        });

        if (!response.ok || !(await response.json()).authenticated) {
          router.push("/admin");
          return;
        }

        // User is authenticated, fetch dashboard data
        fetchData();
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from("admin_settings")
        .select("*")
        .single();

      if (settingsError) {
        console.error("Settings error:", settingsError);
      } else {
        setSettings(settingsData);
        setTempSettings(settingsData);
      }

      // Fetch announcements
      const { data: announcementsData, error: announcementsError } =
        await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false });

      if (announcementsError) {
        console.error("Announcements error:", announcementsError);
      } else {
        setAnnouncements(announcementsData || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call server logout endpoint to clear cookies
      await fetch("/api/admin/logout", {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always redirect to login page
      router.push("/admin");
    }
  };

  const saveSettings = async () => {
    try {
      const { error } = await supabase
        .from("admin_settings")
        .update({
          phone: tempSettings.phone,
          email: tempSettings.email,
          jummah_time: tempSettings.jummah_time,
          updated_at: new Date().toISOString(),
        })
        .eq("id", settings?.id);

      if (error) {
        console.error("Save settings error:", error);
        alert("حدث خطأ أثناء حفظ الإعدادات");
      } else {
        setSettings(tempSettings as AdminSettings);
        setEditingSettings(false);
        alert("تم حفظ الإعدادات بنجاح");
      }
    } catch (error) {
      console.error("Save settings error:", error);
      alert("حدث خطأ أثناء حفظ الإعدادات");
    }
  };

  const addAnnouncement = async () => {
    if (!newAnnouncement.title.trim()) {
      alert("عنوان الإعلان مطلوب");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("announcements")
        .insert([
          {
            title: newAnnouncement.title,
            description: newAnnouncement.description || null,
            date: newAnnouncement.date || null,
            time: newAnnouncement.time || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Add announcement error:", error);
        alert("حدث خطأ أثناء إضافة الإعلان");
      } else {
        setAnnouncements([data, ...announcements]);
        setNewAnnouncement({ title: "", description: "", date: "", time: "" });
        setShowAddForm(false);
        alert("تم إضافة الإعلان بنجاح");
      }
    } catch (error) {
      console.error("Add announcement error:", error);
      alert("حدث خطأ أثناء إضافة الإعلان");
    }
  };

  const deleteAnnouncement = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإعلان؟")) return;

    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete announcement error:", error);
        alert("حدث خطأ أثناء حذف الإعلان");
      } else {
        setAnnouncements(announcements.filter((a) => a.id !== id));
        alert("تم حذف الإعلان بنجاح");
      }
    } catch (error) {
      console.error("Delete announcement error:", error);
      alert("حدث خطأ أثناء حذف الإعلان");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="جامع النور"
                width="40"
                height="40"
                className="object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  لوحة الإدارة
                </h1>
                <p className="text-sm text-gray-600">
                  جامع النور - بومهل البساتين
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Settings Section */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">إعدادات المسجد</h2>
            {!editingSettings ? (
              <Button
                onClick={() => setEditingSettings(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit2 size={16} />
                تعديل
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={saveSettings}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  حفظ
                </Button>
                <Button
                  onClick={() => {
                    setEditingSettings(false);
                    setTempSettings(settings || {});
                  }}
                  variant="outline"
                  size="sm"
                >
                  إلغاء
                </Button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                رقم الهاتف
              </label>
              {editingSettings ? (
                <input
                  type="text"
                  value={tempSettings.phone || ""}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, phone: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg">{settings?.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                البريد الإلكتروني
              </label>
              {editingSettings ? (
                <input
                  type="email"
                  value={tempSettings.email || ""}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg">{settings?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                وقت صلاة الجمعة
              </label>
              {editingSettings ? (
                <input
                  type="time"
                  value={tempSettings.jummah_time || ""}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      jummah_time: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg">
                  {settings?.jummah_time}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Announcements Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">الإعلانات</h2>
            <Button
              onClick={() => setShowAddForm(true)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              إضافة إعلان
            </Button>
          </div>

          {/* Add New Announcement Form */}
          {showAddForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">إضافة إعلان جديد</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الإعلان <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="أدخل عنوان الإعلان"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف الإعلان
                  </label>
                  <textarea
                    value={newAnnouncement.description}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    placeholder="أدخل وصف الإعلان (اختياري)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    value={newAnnouncement.date}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوقت
                  </label>
                  <input
                    type="time"
                    value={newAnnouncement.time}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        time: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={addAnnouncement}>إضافة الإعلان</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewAnnouncement({
                      title: "",
                      description: "",
                      date: "",
                      time: "",
                    });
                  }}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          )}

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-gray-500 text-center py-8">لا توجد إعلانات</p>
            ) : (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      {announcement.description && (
                        <p className="text-gray-600 mb-3">
                          {announcement.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {announcement.date && (
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(announcement.date).toLocaleDateString(
                              "ar-TN",
                            )}
                          </div>
                        )}
                        {announcement.time && (
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {announcement.time}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => deleteAnnouncement(announcement.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
