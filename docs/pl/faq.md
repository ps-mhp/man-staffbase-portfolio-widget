# FAQ

**Pytanie:** Widżet nic nie wyświetla. Co jest tego przyczyną?

Odpowiedź: Albo pole **Kafelki** jest puste, albo jego zawartość nie jest
prawidłowym JSON. W drugim przypadku w konsoli programisty przeglądarki pojawia się
komunikat „portfolio-widget: Pole „Kafelki” nie zawiera prawidłowej
tablicy JSON”. Najczęstsze przyczyny: przecinek po ostatniej kafelce,
brakujący nawias zamykający lub cudzysłowy typograficzne („ ”) zamiast
prostych ("). Sprawdź tekst w narzędziu do sprawdzania JSON.

**Pytanie:** Brakuje jednej kafelki, pozostałe są wyświetlane.

Odpowiedź: W tej kafelce brakuje atrybutu `title`. Kafelki bez tytułu są
pomijane, aby błąd w jednej kafelce nie spowodował pominięcia pozostałych.
Atrybut `title`, składający się wyłącznie ze spacji, jest traktowany jako
brakujący.

**Pytanie:** Skąd wziąć adres dla `image`?

Odpowiedź: Prześlij obraz do biblioteki multimediów, otwórz go tam i skopiuj
adres. Obraz z zewnętrznej strony internetowej również się nadaje,
o ile jest publicznie dostępny.

**Pytanie:** Dlaczego jedna z moich kafelek nie ma strzałki, mimo że opcja „Pokaż strzałkę”
jest włączona?

Odpowiedź: W tej kafelce brakuje atrybutu `link`. Bez adresu docelowego nie można jej kliknąć, a
strzałka sugerowałaby działanie, które nie istnieje.

**Pytanie:** Obrazy są przycięte na różną wysokość.

Odpowiedź: Wszystkie obrazy są dostosowywane do proporcji 16:9 i całkowicie wypełniają
obszar obrazu. W przypadku znacznie odbiegających proporcji
przycięcie będzie wyglądało różnie. W miarę możliwości dostarczajcie motywy już w
proporcjach 16:9.

**Pytanie:** Czy mogę wymusić wyświetlanie kafelków w określonej liczbie kolumn?

Odpowiedź: Nie. Kafelki mają stałą szerokość i przechodzą na następną kolumnę, gdy tylko
miejsca — tak samo jak w przypadku własnego widżetu portfolio Staffbase.

**Pytanie:** Kiedy pojawi się prawdziwy edytor zamiast pola JSON?

Odpowiedź: Jest to planowane. Format danych pozostanie przy tym niezmieniony, więc kafelki, które
obecnie Państwo zarządzają, pozostaną bez zmian.
