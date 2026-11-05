# Krok po kroku

## Konfiguracja podstawowa

1. Umieść widżet **Portfolio** w wybranym miejscu na stronie.
2. Otwórz ustawienia widżetu i kliknij
   **Edytuj kafelki**. Otworzy się edytor kafelków.
3. Kliknij **Dodaj kafelek**. Na końcu listy pojawi się nowy, pusty wiersz
  .
4. Wpisz **Tytuł** i **Link**.
5. Kliknij na obszar z linią przerywaną **Wybierz obraz** i znajdź
   obraz w bibliotece multimediów. Można go tam również bezpośrednio przesłać.
6. Powtórz kroki od 3 do 5 dla każdej kolejnej kafelki.
7. Kliknij **Zastosuj** i zapisz stronę.
8. Pozostaw włączoną opcję **Pokaż strzałkę**, jeśli w prawym górnym rogu każdej
   kafelki ma znajdować się strzałka.
9. Sprawdź wynik w podglądzie.

## Wypełnianie kafelka w całości

Tytuł, link i obraz znajdują się w wierszu. Wszystkie pozostałe elementy znajdują się za
rozwijanym przyciskiem **Więcej** na końcu wiersza:

- **Etykieta** — krótkie słowo określające kategorię nad tytułem, na przykład „Pojazdy”.
- **Opis** — krótki tekst pod tytułem.
- **Tekst alternatywny obrazu** — to, co czytnik ekranu odczyta zamiast obrazu.
  Pozostaw puste, jeśli obraz pełni jedynie funkcję dekoracyjną. Podczas wybierania obrazu
  edytor przejmuje tekst alternatywny z biblioteki multimediów, o ile
  pole to pozostaje puste — nie przejmuje jednak samej nazwy pliku, takiej jak „lkw.png”;
  tekst wpisany ręcznie pozostaje niezmieniony.
- **Otwórz w nowej karcie** — otwiera stronę docelową w nowej karcie przeglądarki.

Przycisk **Mniej** powoduje ponowne zamknięcie sekcji. Każdy wiersz ma własny
przycisk rozwijający.

Obowiązkowe jest tylko pole „Tytuł”. Pozostałe pola mogą pozostać puste.

## Zmiana kolejności

Kolejność kafelków na stronie odpowiada kolejności na liście.

- **Za pomocą myszy:** Chwyć kafelek za uchwyt po lewej stronie i przeciągnij
  go w górę lub w dół. Gdy tylko zakryje on w połowie sąsiedni wiersz,
  oba elementy zamienią się miejscami.
- **Za pomocą klawiatury:** zaznacz uchwyt klawiszem Tab i
  przesuń kafelek za pomocą **strzałki w górę** i **strzałki w dół**
  o jedno miejsce.

## Zmiana lub usunięcie obrazu

Na podglądzie obrazu znajdują się dwa małe przyciski:

- **Ołówek** otwiera bibliotekę multimediów i zastępuje obraz.
- **Kosz** usuwa tylko obraz. Kafelek pozostaje na swoim miejscu i jest
  wyświetlany bez obszaru obrazu.

Natomiast **kosz na prawym skraju wiersza** usuwa całą kafelkę.

## Późniejsza zmiana

1. Kliknij widżet i otwórz jego ustawienia.
2. Kliknij **Edytuj kafelki**.
3. Wprowadź niezbędne zmiany i kliknij **Zastosuj**.
4. Zapisz i sprawdź w podglądzie.

**Anuluj** odrzuca zmiany; jeśli są jakieś zmiany do zatwierdzenia, edytor
wcześniej zapyta o potwierdzenie.

## Jeśli coś nie działa

1. Jeśli na stronie brakuje kafelka, prawdopodobnie brakuje mu tytułu. Edytor
   wyświetla w takim wierszu komunikat „Bez tytułu ten kafelek nie
   zostanie wyświetlony” — kafelek pozostaje na swoim miejscu, po prostu nie jest widoczny.
2. Jeśli kafelka nie ma obrazu, sprawdź adres: musi dać się
   otworzyć bezpośrednio w przeglądarce. Obrazy z biblioteki multimediów zawsze spełniają ten warunek.
3. Jeśli zamiast edytora pojawia się tylko pole tekstowe z JSON, edytuj
   kafelki w tym miejscu — format jest taki sam:

   ```json
   [
     {
       "title": "Ciężarówka",
       "badge": "Pojazdy",
       "description": "Seria ciężarówek do transportu dalekobieżnego.",
       "image": "https://…/lkw.png",
       "imageAlt": "Ciężarówka na autostradzie",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Jeśli po tym nie wyświetla się już nic, najczęściej oznacza to, że plik JSON jest uszkodzony: przecinek
   po ostatnim elemencie lub brakujący nawias zamykający. Sprawdź
   tekst w narzędziu do sprawdzania plików JSON.
