module Main exposing (main)

import Browser
import Html as HT exposing (..)
import Html.Attributes as HA
import Html.Events exposing (..)
import Html.Events.Extra exposing (targetValueIntParse)
import Json.Decode as Json
import List.Extra exposing (..)
import String


main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }


minValue =
    0


maxValue =
    120


initialModel : Model
initialModel =
    { volumeState = V50
    }


type Msg
    = Increase
    | Decrease
    | Reset
    | SetAction String


type VolumeState
    = V0
    | V10
    | V20
    | V30
    | V40
    | V50
    | V60
    | V70
    | V80
    | V90
    | V100
    | V110
    | V120


type alias Model =
    { volumeState : VolumeState
    }


valueForVolumeState : VolumeState -> Int
valueForVolumeState state =
    case state of
        V0 ->
            0

        V10 ->
            10

        V20 ->
            20

        V30 ->
            30

        V40 ->
            40

        V50 ->
            50

        V60 ->
            60

        V70 ->
            70

        V80 ->
            80

        V90 ->
            90

        V100 ->
            100

        V110 ->
            110

        V120 ->
            120


actionsForState : VolumeState -> List Msg
actionsForState state =
    case state of
        V0 ->
            [ Increase, Reset ]

        V10 ->
            [ Increase, Decrease, Reset ]

        V20 ->
            [ Increase, Decrease, Reset ]

        V30 ->
            [ Increase, Decrease, Reset ]

        V40 ->
            [ Increase, Decrease, Reset ]

        V50 ->
            [ Increase, Decrease ]

        V60 ->
            [ Increase, Decrease, Reset ]

        V70 ->
            [ Increase, Decrease, Reset ]

        V80 ->
            [ Increase, Decrease, Reset ]

        V90 ->
            [ Increase, Decrease, Reset ]

        V100 ->
            [ Increase, Decrease, Reset ]

        V110 ->
            [ Increase, Decrease, Reset ]

        V120 ->
            [ Decrease, Reset ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetAction value ->
            case compare (Maybe.withDefault 0 (String.toInt value)) (valueForVolumeState model.volumeState) of
                LT ->
                    update Decrease model

                GT ->
                    update Increase model

                EQ ->
                    model

        Reset ->
            case model.volumeState of
                V0 ->
                    { model | volumeState = V50 }

                V10 ->
                    { model | volumeState = V50 }

                V20 ->
                    { model | volumeState = V50 }

                V30 ->
                    { model | volumeState = V50 }

                V40 ->
                    { model | volumeState = V50 }

                V60 ->
                    { model | volumeState = V50 }

                V70 ->
                    { model | volumeState = V50 }

                V80 ->
                    { model | volumeState = V50 }

                V90 ->
                    { model | volumeState = V50 }

                V100 ->
                    { model | volumeState = V50 }

                V110 ->
                    { model | volumeState = V50 }

                _ ->
                    model

        Increase ->
            case model.volumeState of
                V0 ->
                    { model | volumeState = V10 }

                V10 ->
                    { model | volumeState = V20 }

                V20 ->
                    { model | volumeState = V30 }

                V30 ->
                    { model | volumeState = V40 }

                V40 ->
                    { model | volumeState = V50 }

                V50 ->
                    { model | volumeState = V60 }

                V60 ->
                    { model | volumeState = V70 }

                V70 ->
                    { model | volumeState = V80 }

                V80 ->
                    { model | volumeState = V90 }

                V90 ->
                    { model | volumeState = V100 }

                V100 ->
                    { model | volumeState = V110 }

                V110 ->
                    { model | volumeState = V120 }

                _ ->
                    model

        Decrease ->
            case model.volumeState of
                V10 ->
                    { model | volumeState = V0 }

                V20 ->
                    { model | volumeState = V10 }

                V30 ->
                    { model | volumeState = V20 }

                V40 ->
                    { model | volumeState = V30 }

                V50 ->
                    { model | volumeState = V40 }

                V60 ->
                    { model | volumeState = V50 }

                V70 ->
                    { model | volumeState = V60 }

                V80 ->
                    { model | volumeState = V70 }

                V90 ->
                    { model | volumeState = V80 }

                V100 ->
                    { model | volumeState = V90 }

                V110 ->
                    { model | volumeState = V100 }

                V120 ->
                    { model | volumeState = V110 }

                _ ->
                    model


view : Model -> Html Msg
view model =
    let
        nextAction =
            actionsForState model.volumeState
    in
    div []
        [ p [] [ text ("Playing State: " ++ Debug.toString model.volumeState) ]
        , button [ HA.disabled (notMember Increase nextAction), onClick Increase ] [ text (String.toUpper (Debug.toString Increase)) ]
        , button [ HA.disabled (notMember Decrease nextAction), onClick Decrease ] [ text (String.toUpper (Debug.toString Decrease)) ]
        , button [ HA.disabled (notMember Reset nextAction), onClick Reset ] [ text (String.toUpper (Debug.toString Reset)) ]
        , div [ HA.style "margin-top" "20px" ]
            [ HT.span [] [ text (String.fromInt minValue) ]
            , input [ HA.type_ "range", HA.step "10", HA.min (String.fromInt minValue), HA.max (String.fromInt maxValue), HA.value <| String.fromInt (valueForVolumeState model.volumeState), onInput SetAction ] []
            , HT.span [] [ text (String.fromInt maxValue) ]
            ]
        ]
