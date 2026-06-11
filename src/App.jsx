import { useState, useMemo, useEffect } from "react";

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
const STORAGE_KEY = "travel-archive-trips";

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function TravelArchive() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filterContinent, setFilterContinent] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    countrySearch: "", selectedCountry: null,
    cityInput: "", cities: [], date: "", memo: "", rating: 5,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTrips(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setTrips([]);
    }
    setLoading(false);
  }, []);

  function persistTrips(newTrips) {
    setTrips(newTrips);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips)); } catch (e) {}
  }

  const filteredTrips = useMemo(() => trips.filter((t) => {
    const continentMatch = filterContinent === "전체" || t.country.continent === filterContinent;
    const searchMatch = !searchQuery || t.country.name.includes(searchQuery) || t.cities.some((c) => c.includes(searchQuery));
    return continentMatch && searchMatch;
  }), [trips, filterContinent, searchQuery]);

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
    persistTrips([{ id: generateId(), country: form.selectedCountry, cities: form.cities, date: form.date, memo: form.memo, rating: form.rating }, ...trips]);
    setForm({ countrySearch: "", selectedCountry: null, cityInput: "", cities: [], date: "", memo: "", rating: 5 });
    setView("list");
  }

  function deleteTrip(id) {
    persistTrips(trips.filter((t) => t.id !== id));
    setView("list"); setSelectedTrip(null);
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#F8FAFC" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✈︎</div>
        <div style={{ fontSize: 14, color: "#94A3B8" }}>불러오는 중...</div>
      </div>
    </div>
  );

  if (view === "detail" && selectedTrip) {
    const t = selectedTrip;
    return (
      <div style={s.app}><div style={s.container}>
        <button style={s.backBtn} onClick={() => setView("list")}>← 뒤로</button>
        <div style={s.detailCard}>
          <div style={s.detailHeader}>
            <span style={{ fontSize: 40 }}>{t.country.flag}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>{t.country.name}</div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>{t.date}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: CONTINENT_COLORS[t.country.continent] + "22", color: CONTINENT_COLORS[t.country.continent] }}>
              {t.country.continent}
            </span>
          </div>
          <div style={s.detailSection}>
            <div style={s.sectionLabel}>방문 도시</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.cities.map((c) => <span key={c} style={s.cityTagLarge}>📍 {c}</span>)}
            </div>
          </div>
          <div style={s.detailSection}>
            <div style={s.sectionLabel}>평점</div>
            <div>{[1,2,3,4,5].map((s2) => <span key={s2} style={{ fontSize: 24, color: "#F59E0B", opacity: s2 <= t.rating ? 1 : 0.2 }}>★</span>)}</div>
          </div>
          {t.memo && <div style={s.detailSection}>
            <div style={s.sectionLabel}>메모</div>
            <div style={s.memoBox}>{t.memo}</div>
          </div>}
          <button style={s.deleteBtn} onClick={() => deleteTrip(t.id)}>기록 삭제</button>
        </div>
      </div></div>
    );
  }

  if (view === "add") return (
    <div style={s.app}><div style={s.container}>
      <button style={s.backBtn} onClick={() => setView("list")}>← 뒤로</button>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 24, marginTop: 0 }}>새 여행 기록</h2>

      <div style={s.formGroup}>
        <label style={s.label}>나라 *</label>
        {form.selectedCountry ? (
          <div style={s.selectedCountry}>
            <span style={{ fontSize: 20 }}>{form.selectedCountry.flag}</span>
            <span style={{ fontWeight: 600 }}>{form.selectedCountry.name}</span>
            <button style={s.clearBtn} onClick={() => setForm((f) => ({ ...f, selectedCountry: null, countrySearch: "" }))}>✕</button>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <input style={s.input} placeholder="나라 이름 검색 (예: 일본, 프랑스...)" value={form.countrySearch} onChange={(e) => setForm((f) => ({ ...f, countrySearch: e.target.value }))} />
            {countrySuggestions.length > 0 && (
              <div style={s.suggestions}>
                {countrySuggestions.map((c) => (
                  <div key={c.code} style={s.suggestionItem} onClick={() => setForm((f) => ({ ...f, selectedCountry: c, countrySearch: "" }))}>
                    {c.flag} {c.name}<span style={{ fontSize: 11, color: "#94A3B8", marginLeft: "auto" }}>{c.continent}</span>
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
            <button key={sv} style={{ background: "transparent", border: "none", fontSize: 28, cursor: "pointer", color: sv <= form.rating ? "#F59E0B" : "#CBD5E1" }}
              onClick={() => setForm((f) => ({ ...f, rating: sv }))}>★</button>
          ))}
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>메모</label>
        <textarea style={s.textarea} placeholder="여행 기억을 남겨두세요..." value={form.memo}
          onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))} rows={3} />
      </div>

      <button style={{ ...s.saveBtn, opacity: form.selectedCountry && form.cities.length > 0 && form.date ? 1 : 0.4 }} onClick={saveTrip}>
        기록 저장
      </button>
    </div></div>
  );

  return (
    <div style={s.app}><div style={s.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.5px" }}>✈︎ 내 여행 기록</div>
          <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
            {trips.length}개국 · {trips.reduce((sum, t) => sum + t.cities.length, 0)}개 도시
          </div>
        </div>
        <button style={s.addBtn} onClick={() => setView("add")}>+ 추가</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {Object.entries(continentStats).filter(([, n]) => n > 0).map(([cont, n]) => (
          <div key={cont} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 20, padding: "4px 10px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: CONTINENT_COLORS[cont] }} />
            <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{cont} {n}</span>
          </div>
        ))}
      </div>

      <input style={s.searchInput} placeholder="🔍  나라 또는 도시 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
        {CONTINENTS.map((c) => (
          <button key={c} style={{ border: "1px solid", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
            background: filterContinent === c ? "#1E293B" : "transparent", color: filterContinent === c ? "#fff" : "#64748B", borderColor: filterContinent === c ? "#1E293B" : "#E2E8F0" }}
            onClick={() => setFilterContinent(c)}>{c}</button>
        ))}
      </div>

      {filteredTrips.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
          <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {trips.length === 0 ? "아직 기록된 여행이 없어요.\n첫 여행을 추가해보세요!" : "검색 결과가 없어요."}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredTrips.map((t) => (
            <div key={t.id} style={s.tripCard} onClick={() => { setSelectedTrip(t); setView("detail"); }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{t.country.flag}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{t.country.name}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
                    {t.cities.slice(0, 3).join(" · ")}{t.cities.length > 3 && ` +${t.cities.length - 3}`}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.date}</div>
                <div style={{ fontSize: 12, color: "#F59E0B", marginTop: 2 }}>
                  {"★".repeat(t.rating)}<span style={{ opacity: 0.2 }}>{"★".repeat(5 - t.rating)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div></div>
  );
}

const s = {
  app: { minHeight: "100vh", background: "#F8FAFC" },
  container: { maxWidth: 480, margin: "0 auto", padding: "20px 16px 80px" },
  backBtn: { background: "transparent", border: "none", color: "#64748B", fontSize: 14, cursor: "pointer", padding: "0 0 16px", fontWeight: 500 },
  addBtn: { background: "#0F172A", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  searchInput: { width: "100%", padding: "10px 14px", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box", marginBottom: 12, color: "#0F172A" },
  tripCard: { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
  detailCard: { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 20 },
  detailHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24 },
  detailSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 },
  cityTagLarge: { background: "#F1F5F9", color: "#334155", borderRadius: 10, padding: "6px 12px", fontSize: 14, fontWeight: 500 },
  memoBox: { background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#334155", lineHeight: 1.6 },
  deleteBtn: { width: "100%", background: "transparent", color: "#EF4444", border: "1px solid #FCA5A5", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 },
  formGroup: { marginBottom: 20 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 },
  input: { width: "100%", padding: "10px 14px", border: "1px solid #E2E8F0", borderRadius: 10, fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box", color: "#0F172A" },
  textarea: { width: "100%", padding: "10px 14px", border: "1px solid #E2E8F0", borderRadius: 10, fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box", resize: "vertical", color: "#0F172A" },
  suggestions: { position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, zIndex: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" },
  suggestionItem: { padding: "10px 14px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#0F172A" },
  selectedCountry: { display: "flex", alignItems: "center", gap: 10, background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#0F172A" },
  clearBtn: { background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", marginLeft: "auto", fontSize: 12 },
  addCityBtn: { background: "#0F172A", color: "#fff", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
  cityTag: { background: "#EFF6FF", color: "#3B82F6", border: "1px solid #BFDBFE", borderRadius: 20, padding: "4px 10px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 },
  removeTag: { background: "transparent", border: "none", color: "#93C5FD", cursor: "pointer", fontSize: 10, padding: 0 },
  saveBtn: { width: "100%", background: "#0F172A", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 },
};
