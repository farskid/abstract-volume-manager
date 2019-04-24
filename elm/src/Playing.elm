module Playing exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }


initialModel : Model
initialModel =
    { playingState = Idle
    }


type Msg
    = Play
    | Pause


type PlayingState
    = Idle
    | Playing
    | Paused


type alias Model =
    { playingState : PlayingState
    }


actionsForState : PlayingState -> Msg
actionsForState state =
    case state of
        Idle ->
            Play

        Playing ->
            Pause

        Paused ->
            Play


update : Msg -> Model -> Model
update msg model =
    case model.playingState of
        Idle ->
            startPlaying msg model

        Playing ->
            case msg of
                Pause ->
                    { model | playingState = Paused }

                _ ->
                    model

        Paused ->
            startPlaying msg model


startPlaying : Msg -> Model -> Model
startPlaying msg model =
    case msg of
        Play ->
            { model | playingState = Playing }

        _ ->
            model


view : Model -> Html Msg
view model =
    let
        nextAction =
            actionsForState model.playingState
    in
    div []
        [ p [] [ text ("Playing State: " ++ Debug.toString model.playingState) ]
        , button [ disabled (nextAction /= Play), onClick Play ] [ text "Play" ]
        , button [ disabled (nextAction /= Pause), onClick Pause ] [ text "Pause" ]
        ]
