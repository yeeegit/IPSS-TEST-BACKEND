## Projenin sahip olduğu özellikler:

### Backend:

- JWT ile kullanıcı kimliği doğrulaması
- Register işlemi
- Login işlemi
- Kullanıcı ismi ve profil fotosu güncelleyebilme
- Veritabanından belirli kriterlere göre istenen bilgileri getirme
- Blog/tarif okuma, oluşturma, düzenleme ve silme (CRUD) operasyonlarını yapabilme
- Blog içine yorum yazabilme, bu blogu beğenebilme veya beğenmeme
- MongoDB ile bağlantı

### Frontend:

- Tailwind config'inin ve backend bağlantılarının yapılıp test edilmesi ve bazı iskelet tasarımların uygulanması dışında üzerinde çalışılmaya hazır bir UI template denebilir

## Potansiyel geliştirmeler:

1. Blog'larda tag sistemi, tag'lara göre arama seçeneği vb.
2. Yorumun, blog'un vb. yazıldığı ve en son güncellendiği tarihin gösterimi
3. Halihazırda bulunan kod daha da ufak parçalara ayrılabilir, bu sayede modülerliği arttırabiliriz
4. Frontend tarafında yapılacak birkaç optimizasyon var, özellikle searchbar için bir debounce özelliği gereksiz API call'arı azaltmaya yeterli olacaktır
5. SEO, dinamik meta tagları ve page title güncelleme, `useMetaTag` diye bir React hook'uyla bu hızlıca yapılabilecek bir özellik
6. Kullanıcının kendi yazdığı yorumu veya kendi yazdığı tarifteki yorumları silebilme, bu yorumları aynı tarifi beğenir gibi beğenme/beğenmeme
7. Frontend tarafında Tailwind ile yeniden yerleştirme yapılabilir, daha güzel bir UI için.
