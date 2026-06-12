import { useState, useMemo, useEffect, useRef } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const COUNTRIES_DATA = [
  { code: "KR", name: "대한민국", flag: "🇰🇷", continent: "아시아" },
  { code: "JP", name: "일본", flag: "🇯🇵", continent: "아시아" },
  { code: "CN", name: "중국", flag: "🇨🇳", continent: "아시아" },
  { code: "TH", name: "태국", flag: "🇹🇭", continent: "아시아" },
  { code: "VN", name: "베트남", flag: "🇻🇳", continent: "아시아" },
  { code: "SG", name: "싱가포르", flag: "🇸🇬", continent: "아시아" },
  { code: "MY", name: "말레이시아", flag: "🇲🇾", continent: "아시아" },
  { code: "ID", name: "인도네시아", flag: "🇮🇩", continent: "아시아" },
  { code: "PH", name: "필리핀", flag: "🇵🇭", continent: "아시아" },
  { code: "TW", name: "대만", flag: "🇹🇼", continent: "아시아" },
  { code: "HK", name: "홍콩", flag: "🇭🇰", continent: "아시아" },
  { code: "IN", name: "인도", flag: "🇮🇳", continent: "아시아" },
  { code: "NP", name: "네팔", flag: "🇳🇵", continent: "아시아" },
  { code: "MN", name: "몽골", flag: "🇲🇳", continent: "아시아" },
  { code: "AE", name: "아랍에미리트", flag: "🇦🇪", continent: "아시아" },
  { code: "QA", name: "카타르", flag: "🇶🇦", continent: "아시아" },
  { code: "IL", name: "이스라엘", flag: "🇮🇱", continent: "아시아" },
  { code: "JO", name: "요르단", flag: "🇯🇴", continent: "아시아" },
  { code: "MO", name: "마카오", flag: "🇲🇴", continent: "아시아" },
  { code: "KH", name: "캄보디아", flag: "🇰🇭", continent: "아시아" },
  { code: "MM", name: "미얀마", flag: "🇲🇲", continent: "아시아" },
  { code: "LK", name: "스리랑카", flag: "🇱🇰", continent: "아시아" },
  { code: "MV", name: "몰디브", flag: "🇲🇻", continent: "아시아" },
  { code: "UZ", name: "우즈베키스탄", flag: "🇺🇿", continent: "아시아" },
  { code: "KZ", name: "카자흐스탄", flag: "🇰🇿", continent: "아시아" },
  { code: "US", name: "미국", flag: "🇺🇸", continent: "아메리카" },
  { code: "CA", name: "캐나다", flag: "🇨🇦", continent: "아메리카" },
  { code: "MX", name: "멕시코", flag: "🇲🇽", continent: "아메리카" },
  { code: "BR", name: "브라질", flag: "🇧🇷", continent: "아메리카" },
  { code: "AR", name: "아르헨티나", flag: "🇦🇷", continent: "아메리카" },
  { code: "PE", name: "페루", flag: "🇵🇪", continent: "아메리카" },
  { code: "CL", name: "칠레", flag: "🇨🇱", continent: "아메리카" },
  { code: "CO", name: "콜롬비아", flag: "🇨🇴", continent: "아메리카" },
  { code: "CU", name: "쿠바", flag: "🇨🇺", continent: "아메리카" },
  { code: "GB", name: "영국", flag: "🇬🇧", continent: "유럽" },
  { code: "FR", name: "프랑스", flag: "🇫🇷", continent: "유럽" },
  { code: "DE", name: "독일", flag: "🇩🇪", continent: "유럽" },
  { code: "IT", name: "이탈리아", flag: "🇮🇹", continent: "유럽" },
  { code: "ES", name: "스페인", flag: "🇪🇸", continent: "유럽" },
  { code: "PT", name: "포르투갈", flag: "🇵🇹", continent: "유럽" },
  { code: "NL", name: "네덜란드", flag: "🇳🇱", continent: "유럽" },
  { code: "BE", name: "벨기에", flag: "🇧🇪", continent: "유럽" },
  { code: "CH", name: "스위스", flag: "🇨🇭", continent: "유럽" },
  { code: "AT", name: "오스트리아", flag: "🇦🇹", continent: "유럽" },
  { code: "SE", name: "스웨덴", flag: "🇸🇪", continent: "유럽" },
  { code: "NO", name: "노르웨이", flag: "🇳🇴", continent: "유럽" },
  { code: "DK", name: "덴마크", flag: "🇩🇰", continent: "유럽" },
  { code: "FI", name: "핀란드", flag: "🇫🇮", continent: "유럽" },
  { code: "PL", name: "폴란드", flag: "🇵🇱", continent: "유럽" },
  { code: "CZ", name: "체코", flag: "🇨🇿", continent: "유럽" },
  { code: "HU", name: "헝가리", flag: "🇭🇺", continent: "유럽" },
  { code: "GR", name: "그리스", flag: "🇬🇷", continent: "유럽" },
  { code: "HR", name: "크로아티아", flag: "🇭🇷", continent: "유럽" },
  { code: "TR", name: "튀르키예", flag: "🇹🇷", continent: "유럽" },
  { code: "RU", name: "러시아", flag: "🇷🇺", continent: "유럽" },
  { code: "IS", name: "아이슬란드", flag: "🇮🇸", continent: "유럽" },
  { code: "IE", name: "아일랜드", flag: "🇮🇪", continent: "유럽" },
  { code: "AU", name: "호주", flag: "🇦🇺", continent: "오세아니아" },
  { code: "NZ", name: "뉴질랜드", flag: "🇳🇿", continent: "오세아니아" },
  { code: "FJ", name: "피지", flag: "🇫🇯", continent: "오세아니아" },
  { code: "EG", name: "이집트", flag: "🇪🇬", continent: "아프리카" },
  { code: "MA", name: "모로코", flag: "🇲🇦", continent: "아프리카" },
  { code: "ZA", name: "남아프리카공화국", flag: "🇿🇦", continent: "아프리카" },
  { code: "KE", name: "케냐", flag: "🇰🇪", continent: "아프리카" },
  { code: "TZ", name: "탄자니아", flag: "🇹🇿", continent: "아프리카" },
];

const CONTINENTS = ["전체", "아시아", "유럽", "아메리카", "오세아니아", "아프리카"];
const CONTINENT_COLORS = {
  아시아: "#4ECDC4", 유럽: "#A78BFA", 아메리카: "#F59E0B",
  오세아니아: "#34D399", 아프리카: "#F87171",
};

const CONTINENT_GRADIENTS = {
  아시아: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  유럽: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
  아메리카: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  오세아니아: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  아프리카: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  default: "linear-gradient(135deg, #868f96 0%, #596164 100%)",
};

const STORAGE_KEY = "travel-archive-trips";
const SORT_OPTIONS = [
  { value: "date-desc", label: "최신순" },
  { value: "date-asc", label: "오래된순" },
  { value: "country", label: "나라별" },
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const EMPTY_FORM = {
  countrySearch: "", selectedCountry: null,
  cityInput: "", cities: [], date: "", memo: "", rating: 5, thumbnail: null,
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  return `${year}년 ${parseInt(month)}월`;
}

// Color tokens — warm light gray like reference image 2
const C = {
  bg: "#EBEBЕ5",        // main background (warm off-white)
  surface: "#F4F4EE",   // card / input surface
  surfaceAlt: "#EDEDE7",// slightly deeper surface
  border: "#DCDCD6",    // borders
  text: "#1A1A1A",      // primary text
  textSub: "#777770",   // secondary text
  textMuted: "#AAAAA4", // muted text
  accent: "#1A1A1A",    // button bg
  accentText: "#F4F4EE",// button text
};

export default function TravelArchive() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filterContinent, setFilterContinent] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTrips(saved ? JSON.parse(saved) : []);
    } catch (e) { setTrips([]); }
    setLoading(false);
  }, []);

  function persistTrips(newTrips) {
    setTrips(newTrips);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips)); } catch (e) {}
  }

  function handleThumbnailChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setThumbnailPreview(dataUrl);
      setForm((f) => ({ ...f, thumbnail: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  function handleDetailThumbnailChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const updated = trips.map((t) =>
        t.id === selectedTrip.id ? { ...t, thumbnail: dataUrl } : t
      );
      persistTrips(updated);
      setSelectedTrip({ ...selectedTrip, thumbnail: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  const filteredAndSorted = useMemo(() => {
    let result = trips.filter((t) => {
      const continentMatch = filterContinent === "전체" || t.country.continent === filterContinent;
      const searchMatch = !searchQuery || t.country.name.includes(searchQuery) || t.cities.some((c) => c.includes(searchQuery));
      return continentMatch && searchMatch;
    });
    if (sortBy === "date-desc") result = [...result].sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === "date-asc") result = [...result].sort((a, b) => a.date.localeCompare(b.date));
    else if (sortBy === "country") result = [...result].sort((a, b) => a.country.name.localeCompare(b.country.name, "ko"));
    return result;
  }, [trips, filterContinent, searchQuery, sortBy]);

  const countrySuggestions = useMemo(() => {
    if (!form.countrySearch) return [];
    return COUNTRIES_DATA.filter((c) =>
      c.name.includes(form.countrySearch) || c.code.toLowerCase().includes(form.countrySearch.toLowerCase())
    ).slice(0, 6);
  }, [form.countrySearch]);

  const continentStats = useMemo(() => {
    const stats = {};
    CONTINENTS.filter((c) => c !== "전체").forEach((c) => (stats[c] = 0));
    trips.forEach((t) => { stats[t.country.continent] = (stats[t.country.continent] || 0) + 1; });
    return stats;
  }, [trips]);

  function addCity() {
    const city = form.cityInput.trim();
    if (city && !form.cities.includes(city)) setForm((f) => ({ ...f, cities: [...f.cities, city], cityInput: "" }));
  }

  function saveTrip() {
    if (!form.selectedCountry || form.cities.length === 0 || !form.date) return;
    if (editingId) {
      const updated = trips.map((t) =>
        t.id === editingId
          ? { ...t, country: form.selectedCountry, cities: form.cities, date: form.date, memo: form.memo, rating: form.rating, thumbnail: form.thumbnail !== undefined ? form.thumbnail : t.thumbnail }
          : t
      );
      persistTrips(updated);
      setSelectedTrip(updated.find((t) => t.id === editingId));
      setEditingId(null);
      setView("detail");
    } else {
      persistTrips([{ id: generateId(), country: form.selectedCountry, cities: form.cities, date: form.date, memo: form.memo, rating: form.rating, thumbnail: form.thumbnail || null }, ...trips]);
      setView("list");
    }
    setForm(EMPTY_FORM);
    setThumbnailPreview(null);
  }

  function startEdit(trip) {
    setEditingId(trip.id);
    setThumbnailPreview(trip.thumbnail || null);
    setForm({ countrySearch: "", selectedCountry: trip.country, cityInput: "", cities: [...trip.cities], date: trip.date, memo: trip.memo, rating: trip.rating, thumbnail: trip.thumbnail || null });
    setView("add");
  }

  function deleteTrip(id) {
    persistTrips(trips.filter((t) => t.id !== id));
    setView("list"); setSelectedTrip(null);
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: C.bg }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✈︎</div>
        <div style={{ fontSize: 14, color: C.textMuted }}>불러오는 중...</div>
      </div>
    </div>
  );

  // ── DETAIL VIEW ──
  if (view === "detail" && selectedTrip) {
    const t = selectedTrip;
    const bg = CONTINENT_GRADIENTS[t.country.continent] || CONTINENT_GRADIENTS.default;
    return (
      <div style={s.app}>
        <div style={s.container}>
          <button style={s.backBtn} onClick={() => setView("list")}>← 뒤로</button>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ height: 220, background: t.thumbnail ? `url(${t.thumbnail}) center/cover no-repeat` : bg }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 4 }}>
                  {t.country.continent}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
                  {t.country.flag} {t.country.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{formatDate(t.date)}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                  <span style={{ fontSize: 13, color: "#F59E0B", letterSpacing: 2 }}>
                    {"★".repeat(t.rating)}<span style={{ opacity: 0.25 }}>{"★".repeat(5 - t.rating)}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              style={{ position: "absolute", top: 12, right: 12, zIndex: 2, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
              onClick={() => editFileInputRef.current?.click()}
            >📷 사진 변경</button>
            <input ref={editFileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleDetailThumbnailChange} />
          </div>

          <div style={s.detailCard}>
            <div style={s.detailSection}>
              <div style={s.sectionLabel}>방문 도시</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {t.cities.map((c) => <span key={c} style={s.cityTagLarge}>📍 {c}</span>)}
              </div>
            </div>
            {t.memo && (
              <div style={s.detailSection}>
                <div style={s.sectionLabel}>메모</div>
                <div style={s.memoBox}>{t.memo}</div>
              </div>
            )}
            <button style={s.editBtn} onClick={() => startEdit(t)}>기록 수정</button>
            <button style={s.deleteBtn} onClick={() => deleteTrip(t.id)}>기록 삭제</button>
          </div>
        </div>
      </div>
    );
  }

  // ── ADD / EDIT VIEW ──
  if (view === "add") return (
    <div style={s.app}><div style={s.container}>
      <button style={s.backBtn} onClick={() => {
        setView(editingId ? "detail" : "list");
        if (editingId) { setEditingId(null); setForm(EMPTY_FORM); setThumbnailPreview(null); }
      }}>← 뒤로</button>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 24, marginTop: 0 }}>
        {editingId ? "여행 기록 수정" : "새 여행 기록"}
      </h2>

      <div style={s.formGroup}>
        <label style={s.label}>대표 사진</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: "100%", height: 160, borderRadius: 16, cursor: "pointer", overflow: "hidden",
            background: thumbnailPreview ? `url(${thumbnailPreview}) center/cover no-repeat` : C.surfaceAlt,
            border: thumbnailPreview ? "none" : `2px dashed ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
          }}
        >
          {!thumbnailPreview && (
            <div style={{ textAlign: "center", color: C.textMuted }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
              <div style={{ fontSize: 13 }}>갤러리에서 사진 선택</div>
            </div>
          )}
          {thumbnailPreview && (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
              <span style={{ position: "relative", zIndex: 1, padding: "10px 14px", fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>탭하여 변경</span>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleThumbnailChange} />
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>나라 *</label>
        {form.selectedCountry ? (
          <div style={s.selectedCountry}>
            <span style={{ fontSize: 20 }}>{form.selectedCountry.flag}</span>
            <span style={{ fontWeight: 600, color: C.text }}>{form.selectedCountry.name}</span>
            <button style={s.clearBtn} onClick={() => setForm((f) => ({ ...f, selectedCountry: null, countrySearch: "" }))}>✕</button>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <input style={s.input} placeholder="나라 이름 검색 (예: 일본, 프랑스...)" value={form.countrySearch} onChange={(e) => setForm((f) => ({ ...f, countrySearch: e.target.value }))} />
            {countrySuggestions.length > 0 && (
              <div style={s.suggestions}>
                {countrySuggestions.map((c) => (
                  <div key={c.code} style={s.suggestionItem} onClick={() => setForm((f) => ({ ...f, selectedCountry: c, countrySearch: "" }))}>
                    {c.flag} {c.name}<span style={{ fontSize: 11, color: C.textMuted, marginLeft: "auto" }}>{c.continent}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>방문 도시 *</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...s.input, flex: 1 }} placeholder="도시 이름 입력" value={form.cityInput}
            onChange={(e) => setForm((f) => ({ ...f, cityInput: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && addCity()} />
          <button style={s.addCityBtn} onClick={addCity}>추가</button>
        </div>
        {form.cities.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {form.cities.map((c) => (
              <span key={c} style={s.cityTag}>{c}
                <button style={s.removeTag} onClick={() => setForm((f) => ({ ...f, cities: f.cities.filter((x) => x !== c) }))}>✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>여행 시기 *</label>
        <input style={s.input} type="month" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>평점</label>
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3,4,5].map((sv) => (
            <button key={sv} style={{ background: "transparent", border: "none", fontSize: 28, cursor: "pointer", color: sv <= form.rating ? "#F59E0B" : C.border }}
              onClick={() => setForm((f) => ({ ...f, rating: sv }))}>★</button>
          ))}
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>메모</label>
        <textarea style={s.textarea} placeholder="여행 기억을 남겨두세요..." value={form.memo}
          onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))} rows={3} />
      </div>

      <button style={{ ...s.saveBtn, opacity: form.selectedCountry && form.cities.length > 0 && form.date ? 1 : 0.35 }} onClick={saveTrip}>
        {editingId ? "수정 완료" : "기록 저장"}
      </button>
    </div></div>
  );

  // ── LIST VIEW ──
  return (
    <div style={s.app}><div style={s.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.5px" }}>✈︎ 내 여행 기록</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3 }}>
            {trips.length}개국 · {trips.reduce((sum, t) => sum + t.cities.length, 0)}개 도시
          </div>
        </div>
        <button style={s.addBtn} onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setThumbnailPreview(null); setView("add"); }}>+ 추가</button>
      </div>

      {Object.entries(continentStats).some(([, n]) => n > 0) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {Object.entries(continentStats).filter(([, n]) => n > 0).map(([cont, n]) => (
            <div key={cont} style={{ display: "flex", alignItems: "center", gap: 5, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "4px 10px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: CONTINENT_COLORS[cont] }} />
              <span style={{ fontSize: 12, color: C.textSub, fontWeight: 500 }}>{cont} {n}</span>
            </div>
          ))}
        </div>
      )}

      <input style={s.searchInput} placeholder="🔍  나라 또는 도시 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2, flex: 1 }}>
          {CONTINENTS.map((c) => (
            <button key={c} style={{
              border: "1px solid", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
              background: filterContinent === c ? C.accent : "transparent",
              color: filterContinent === c ? C.accentText : C.textSub,
              borderColor: filterContinent === c ? C.accent : C.border,
            }} onClick={() => setFilterContinent(c)}>{c}</button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.textSub, fontSize: 12, padding: "6px 10px", cursor: "pointer", outline: "none", flexShrink: 0 }}
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {trips.length === 0 ? "아직 기록된 여행이 없어요.\n첫 여행을 추가해보세요!" : "검색 결과가 없어요."}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {filteredAndSorted.map((t) => {
            const bg = CONTINENT_GRADIENTS[t.country.continent] || CONTINENT_GRADIENTS.default;
            return (
              <div
                key={t.id}
                onClick={() => { setSelectedTrip(t); setView("detail"); }}
                style={{
                  position: "relative", borderRadius: 16, overflow: "hidden",
                  aspectRatio: "3/4", cursor: "pointer",
                  background: t.thumbnail ? `url(${t.thumbnail}) center/cover no-repeat` : bg,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                  {t.country.continent}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 12px 14px" }}>
                  <div style={{ fontSize: 10, color: "#F59E0B", letterSpacing: 1, marginBottom: 5 }}>
                    {"★".repeat(t.rating)}<span style={{ opacity: 0.25 }}>{"★".repeat(5 - t.rating)}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                    {t.country.flag} {t.country.name}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                    {t.cities.slice(0, 2).join(" · ")}{t.cities.length > 2 && ` +${t.cities.length - 2}`}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 5, fontWeight: 500 }}>
                    {formatDate(t.date)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    <SpeedInsights />
    </div>
  );
}

const s = {
  app: { minHeight: "100vh", background: "#EBEAE4" },
  container: { maxWidth: 480, margin: "0 auto", padding: "24px 16px 100px" },
  backBtn: { background: "transparent", border: "none", color: "#999993", fontSize: 14, cursor: "pointer", padding: "0 0 18px", fontWeight: 500 },
  addBtn: { background: "#1A1A1A", color: "#F4F4EE", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  searchInput: { width: "100%", padding: "10px 14px", border: "1px solid #DCDCD6", borderRadius: 12, fontSize: 14, background: "#F4F4EE", outline: "none", boxSizing: "border-box", marginBottom: 12, color: "#1A1A1A" },
  detailCard: { background: "#F4F4EE", border: "1px solid #DCDCD6", borderRadius: 16, padding: 20 },
  detailSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 11, fontWeight: 600, color: "#AAAAA4", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 },
  cityTagLarge: { background: "#E6E6DF", color: "#333", borderRadius: 10, padding: "6px 12px", fontSize: 14, fontWeight: 500 },
  memoBox: { background: "#ECEAE3", border: "1px solid #DCDCD6", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#555550", lineHeight: 1.7 },
  editBtn: { width: "100%", background: "#1A1A1A", color: "#F4F4EE", border: "none", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8, marginBottom: 8 },
  deleteBtn: { width: "100%", background: "transparent", color: "#EF4444", border: "1px solid #FECACA", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  formGroup: { marginBottom: 20 },
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#AAAAA4", marginBottom: 8, letterSpacing: "0.8px", textTransform: "uppercase" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #DCDCD6", borderRadius: 10, fontSize: 14, background: "#F4F4EE", outline: "none", boxSizing: "border-box", color: "#1A1A1A" },
  textarea: { width: "100%", padding: "11px 14px", border: "1px solid #DCDCD6", borderRadius: 10, fontSize: 14, background: "#F4F4EE", outline: "none", boxSizing: "border-box", resize: "vertical", color: "#1A1A1A" },
  suggestions: { position: "absolute", top: "100%", left: 0, right: 0, background: "#F4F4EE", border: "1px solid #DCDCD6", borderRadius: 10, zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.07)" },
  suggestionItem: { padding: "10px 14px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#1A1A1A", borderBottom: "1px solid #E6E6DF" },
  selectedCountry: { display: "flex", alignItems: "center", gap: 10, background: "#ECEAE3", border: "1px solid #DCDCD6", borderRadius: 10, padding: "10px 14px", fontSize: 14 },
  clearBtn: { background: "transparent", border: "none", color: "#AAAAA4", cursor: "pointer", marginLeft: "auto", fontSize: 12 },
  addCityBtn: { background: "#1A1A1A", color: "#F4F4EE", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },
  cityTag: { background: "#EEF2FF", color: "#6366F1", border: "1px solid #C7D2FE", borderRadius: 20, padding: "4px 10px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 },
  removeTag: { background: "transparent", border: "none", color: "#AAAAA4", cursor: "pointer", fontSize: 10, padding: 0 },
  saveBtn: { width: "100%", background: "#1A1A1A", color: "#F4F4EE", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 },
};
