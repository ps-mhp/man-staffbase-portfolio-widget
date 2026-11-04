# Krok po kroku

## Konfiguracja podstawowa

1. Najpierw umieść zdjęcia w bibliotece multimediów i skopiuj ich
   adresy. Każda kafelka wymaga własnego adresu.
2. Umieść widżet **Portfolio** w wybranym miejscu na stronie.
3. W polu **Kafelki** wprowadź listę. Każdy kafelek to obiekt w
   nawiasach kwadratowych, oddzielony przecinkami:

   ```json
   [
     {
       "title": "Ciężarówka",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Autobus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Pozostaw opcję **Pokaż strzałkę** włączoną, jeśli w prawym górnym rogu każdej
   kafelki ma znajdować się strzałka.
5. Zapisz i sprawdź wynik w podglądzie.

## Wypełnienie całej kafelki

Wszystkie pola dostępne w kafelce:

```json
{
  "title": "Ciężarówka",
  "badge": "Pojazdy",
  "description": "Seria pojazdów ciężarowych do transportu dalekobieżnego.",
  "image": "https://…/lkw.png",
  "imageAlt": "Ciężarówka na autostradzie",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Pole `title` jest obowiązkowe. Pozostałe pola mogą zostać pominięte.

## Zmiana po utworzeniu

1. Kliknij widżet i otwórz jego ustawienia.
2. Zmień tekst w polu **Kafelki**. Kolejność kafelków na
   stronie = kolejność na liście.
3. Zapisz i sprawdź w podglądzie.

## Jeśli coś nie działa

1. Jeśli nie wyświetla się nic, najczęściej oznacza to, że plik JSON jest uszkodzony. Najczęstsza przyczyna:
   przecinek po ostatniej kafelce lub brakujący nawias zamykający.
   Sprawdź tekst w narzędziu do sprawdzania plików JSON.
2. Jeśli brakuje pojedynczej kafelki, prawdopodobnie brakuje jej atrybutu `title` — kafelki bez
   tytułu są pomijane.
3. Jeśli kafelka nie wyświetla obrazu, sprawdź adres w polu `image`: musi
   dać się otworzyć bezpośrednio w przeglądarce.
