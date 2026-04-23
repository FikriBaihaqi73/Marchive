export interface Work {
  id: string;
  title: string;
  category: 'Novel' | 'Puisi' | 'Cerpen' | 'Esai' | 'Desain' | 'Catatan';
  layout: 'book' | 'article'; 
  cover: string;
  date: string;
  data: {
    synopsis?: string;
    content?: string;
    chapters?: { title: string; id: string }[];
  };
  featured?: boolean;
}

export const works: Work[] = [
  {
    id: 'jika-hujan-tiba',
    title: 'Jika Hujan Tiba',
    category: 'Puisi',
    layout: 'article',
    date: 'MAY 12, 2024',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    data: {
      content: "jika hujan tiba,\nbiarkan aku menjadi tanah,\nmenyerap segala yang jatuh\ntanpa sempat bertanya\ndari mana.\nkarena ada kalanya,\nyang datang bukan untuk tinggal,\ntapi untuk mengajarkan cara melepaskan."
    }
  },
  {
    id: 'di-ambang-sunyi',
    title: 'Di Ambang Sunyi',
    category: 'Cerpen',
    layout: 'article',
    date: 'APR 28, 2024',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    data: {
      content: "Di ambang sunyi, kita menemukan diri kita yang sebenarnya. Bukan dalam hiruk-pikuk dunia, melainkan dalam detak jantung yang tenang."
    }
  },
  {
    id: 'fragmen',
    title: 'Fragmen',
    category: 'Novel',
    layout: 'book',
    date: 'MAR 17, 2024',
    cover: 'https://images.unsplash.com/photo-1550399105-05c4a7641b02?auto=format&fit=crop&q=80&w=800',
    data: {
      synopsis: "Kumpulan fragmen kehidupan yang terserak, mencoba menemukan makna di balik keretakan.",
      chapters: [
        { title: 'Bagian I: Retakan', id: 'c1' },
        { title: 'Bagian II: Cahaya', id: 'c2' },
        { title: 'Bagian III: Rekonstruksi', id: 'c3' }
      ]
    }
  },
  {
    id: 'eclipse',
    title: 'Eclipse',
    category: 'Desain',
    layout: 'article',
    date: 'MAR 3, 2024',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    data: {
      content: "A visual exploration of light and darkness, inspired by celestial events."
    }
  },
  {
    id: 'catatan-pendaki',
    title: 'Catatan Pendaki',
    category: 'Catatan',
    layout: 'article',
    date: 'FEB 18, 2024',
    cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    data: {
      content: "Puncak hanyalah bonus, perjalananlah yang menempa jiwa."
    }
  }
];
