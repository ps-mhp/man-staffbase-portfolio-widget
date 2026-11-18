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
W edytorze taka kafelka pozostaje i zawiera informację „Bez tytułu
ta kafelka nie będzie wyświetlana” — nie tracisz jej więc, po prostu
pojawi się na stronie dopiero po nadaniu jej tytułu.

**Pytanie:** Jak umieścić zdjęcie w kafelku?

Odpowiedź: Za pomocą opcji **Wybierz z biblioteki** w sekcji **Zdjęcie**. Biblioteka
otwiera się po prawej stronie jako pasek; można tam bezpośrednio przesłać zdjęcie
lub przeciągnąć je na pole obrazu. Zdjęcie z zewnętrznej strony internetowej
również się nadaje — w tym celu należy w polu **Wstaw adres** wpisać jego
adres https, o ile jest on publicznie dostępny.

**Pytanie:** Chciałem tylko zmienić zdjęcie, a przez przypadek usunąłem całą
kafelkę.

Odpowiedź: Opcja **Usuń** w sekcji **Obraz** usuwa tylko obraz,
a opcja **Usuń kafelek** nad polami usuwa cały kafelek. Dopóki nie kliknąłeś jeszcze przycisku
**Zastosuj**, opcja **Cofnij** cofa tę pomyłkę, a
**Anuluj** odrzuca wszystkie zmiany.

**Pytanie:** Jak zmienić kolejność?

Odpowiedź: Przeciągnij kafelek na liście po lewej stronie za uchwyt w nowe miejsce.
Można to zrobić również bez myszki: zaznacz kafelek, naciśnij spację, przesuń za pomocą **strzałki w górę** i
**strzałki w dół**, naciśnij spację. Nad polami przesuń
**kafelek w górę** i **kafelek w dół** o jedno miejsce.

**Pytanie:** Dlaczego jedna z moich kafelek nie ma strzałki, mimo że opcja „Pokaż strzałkę”
jest włączona?

Odpowiedź: W tej kafelce brakuje linku. Bez adresu docelowego nie można jej kliknąć, a
strzałka sugerowałaby działanie, które nie istnieje.

**Pytanie:** Obrazy są przycięte na różną wysokość.

Odpowiedź: Wszystkie obrazy są dostosowywane do proporcji 16:9 i całkowicie wypełniają obszar obrazu.
W przypadku znacznie odbiegających proporcji przycięcie
będzie wyglądało różnie. W miarę możliwości dostarczajcie motywy już w
proporcjach 16:9.

**Pytanie:** Czy mogę wymusić wyświetlanie kafelek w określonej liczbie kolumn?

Odpowiedź: Nie. Kafelki mają stałą szerokość i przechodzą na następną linię, gdy tylko
miejsca — tak samo jak w przypadku własnego widżetu portfolio Staffbase.

**Pytanie:** Zamiast okna widzę tylko pole tekstowe.

Odpowiedź: Okno pojawia się w miejscu tego pola, gdy tylko
otworzy się okno dialogowe konfiguracji. Jeśli raz się to nie uda,
pole tekstowe pozostaje jako rozwiązanie awaryjne; zawiera ono surową wersję konfiguracji.
Ponowne otwarcie okna dialogowego zazwyczaj przywraca okno.

**Pytanie:** Utworzyłem ten widget jeszcze przed przebudową. Czy coś
się zgubi?

Odpowiedź: Nie. Widżet nadal wyświetla dotychczasowe kafelki i swoją
strzałkę. Okno przejmuje te wartości po otwarciu; dopiero po wprowadzeniu zmian
i wybraniu opcji **Zastosuj** nowa wersja zostanie zapisana.
