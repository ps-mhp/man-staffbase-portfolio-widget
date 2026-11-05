# FAQ

**Pytanie:** Widżet nic nie wyświetla. Co jest tego przyczyną?

Odpowiedź: Zazwyczaj nie utworzono jeszcze żadnej kafelki — otwórz
ustawienia i kliknij **Edytuj kafelki**. Jeśli w
wyjątkowych przypadkach wprowadzili Państwo kafelki w polu tekstowym JSON, treść może nie być
prawidłowym JSON. Wówczas w konsoli programisty przeglądarki pojawi się komunikat
„portfolio-widget: Pole „Kafelki” nie zawiera prawidłowej tablicy JSON.”
Najczęstsze przyczyny: przecinek po ostatniej kafelce, brakujący
nawias zamykający lub cudzysłowy typograficzne („ ”) zamiast prostych
(„”). Sprawdź tekst w narzędziu do sprawdzania JSON.

**Pytanie:** Brakuje jednej kafelki, pozostałe są widoczne.

Odpowiedź: W tej kafelce brakuje tytułu. Kafelki bez tytułu są
pomijane, aby błąd w pisowni w jednej kafelce nie wpłynął na pozostałe.
Tytuł składający się wyłącznie ze spacji jest traktowany jako brakujący.
W edytorze taka kafelka pozostaje widoczna i zawiera informację „Bez tytułu
ta kafelka nie zostanie wyświetlona” — nie tracisz jej więc, po prostu
pojawi się na stronie dopiero po nadaniu jej tytułu.

**Pytanie:** Jak umieścić zdjęcie na kafelku?

Odpowiedź: Za pomocą przerywanego pola **Wybierz zdjęcie** w wierszu, a w przypadku
istniejącego zdjęcia — poprzez kliknięcie na ikonę ołówka nad nim. Oba opcje otwierają bibliotekę multimediów; tam
można również bezpośrednio przesłać zdjęcie. Zdjęcie z zewnętrznej strony internetowej
również się nadaje — w tym celu należy wpisać jego adres w polu JSON `image`,
o ile jest ono publicznie dostępne.

**Pytanie:** Chciałem tylko zmienić zdjęcie, a przez przypadek skasowałem całą
kartę.

Odpowiedź: Istnieją dwa kosze. Ten przy podglądzie obrazka usuwa tylko
obrazek, a ten po prawej stronie wiersza — całą kafelkę. Dopóki nie
kliknąłeś jeszcze **Zastosuj**, możesz cofnąć tę pomyłkę, klikając
**Anuluj**.

**Pytanie:** Jak zmienić kolejność?

Odpowiedź: Przeciągnij kafelek za uchwyt po lewej stronie w nowe miejsce. Można to zrobić również bez
użycia myszy: zaznacz uchwyt za pomocą klawisza Tab, a następnie przesuń za pomocą **strzałki
w górę** i **strzałki w dół**.

**Pytanie:** Dlaczego jedna z moich płytek nie ma strzałki, mimo że opcja „Pokaż strzałkę”
jest włączona?

Odpowiedź: W tej kafelce brakuje linku. Bez adresu docelowego nie można jej kliknąć, a
strzałka sugerowałaby działanie, które nie istnieje.

**Pytanie:** Obrazy są przycięte na różną wysokość.

Odpowiedź: Wszystkie zdjęcia są skalowane do formatu 16:9 i całkowicie wypełniają obszar obrazu.
W przypadku znacznie odbiegających proporcji kadrowanie
będzie wyglądało różnie. W miarę możliwości dostarczaj motywy już w
proporcjach 16:9.

**Pytanie:** Czy mogę wymusić wyświetlanie kafelek w określonej liczbie kolumn?

Odpowiedź: Nie. Kafelki mają stałą szerokość i przechodzą na następną linię, gdy tylko
zabraknie miejsca — dokładnie tak samo jak w przypadku własnego widżetu portfolio Staffbase.

**Pytanie:** Zamiast edytora widzę tylko pole tekstowe z kodem JSON.

Odpowiedź: Edytor pojawia się w miejscu pola **Kafelki**, gdy tylko
otworzy się okno dialogowe konfiguracji. Jeśli raz się to nie uda, pozostaje
pole tekstowe jako rozwiązanie awaryjne; format jest taki sam, a pola
każdej kafelki znajdują się w ustawieniach. Ponowne otwarcie okna dialogowego zazwyczaj przywraca
edytor.
